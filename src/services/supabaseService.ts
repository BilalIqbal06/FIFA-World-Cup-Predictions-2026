import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.')
  // Don't throw error - allow app to load without Supabase for testing
}

export const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

export const supabaseService = {
  // Get player by player code
  async getPlayer(playerCode: string) {
    if (!supabase) {
      console.warn('Supabase not configured, returning null player')
      return null
    }
    
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .eq('player_code', playerCode)
      .single()
    
    if (error) {
      if (error.code === 'PGRST116') {
        return null // Player not found
      }
      throw error
    }
    
    return {
      id: data.id,
      username: data.username,
      betTeamId: data.winner_pick_team_id,
      betTeamName: data.winner_pick_team_name,
      points: data.points
    }
  },

  // Create new player
  async createPlayer(playerCode: string, username: string) {
    if (!supabase) {
      console.warn('Supabase not configured, returning mock player')
      return {
        id: 'mock-id',
        username: username,
        betTeamId: undefined,
        betTeamName: undefined,
        points: 0
      }
    }
    
    const { data, error } = await supabase
      .from('players')
      .insert({
        player_code: playerCode,
        username: username,
        points: 0
      })
      .select()
      .single()
    
    if (error) throw error
    
    return {
      id: data.id,
      username: data.username,
      betTeamId: data.winner_pick_team_id,
      betTeamName: data.winner_pick_team_name,
      points: data.points
    }
  },

  // Get all players for leaderboard
  async getAllPlayers() {
    if (!supabase) {
      console.warn('Supabase not configured, returning empty players list')
      return []
    }
    
    const { data, error } = await supabase
      .from('players')
      .select('id, username, points, winner_pick_team_name')
      .order('points', { ascending: false })
    
    if (error) throw error
    
    return data.map(player => ({
      id: player.id,
      username: player.username,
      points: player.points,
      betTeamName: player.winner_pick_team_name
    }))
  },

  // Update winner pick (locked after first submission)
  async updateWinnerPick(playerCode: string, teamId: string, teamName: string) {
    if (!supabase) {
      console.warn('Supabase not configured, returning mock player')
      return {
        id: 'mock-id',
        username: 'mock',
        betTeamId: teamId,
        betTeamName: teamName,
        points: 0
      }
    }
    
    const { data, error } = await supabase
      .from('players')
      .update({
        winner_pick_team_id: teamId,
        winner_pick_team_name: teamName,
        winner_pick_locked: true
      })
      .eq('player_code', playerCode)
      .select()
      .single()
    
    if (error) throw error
    
    return {
      id: data.id,
      username: data.username,
      betTeamId: data.winner_pick_team_id,
      betTeamName: data.winner_pick_team_name,
      points: data.points
    }
  },

  // Save prediction for a game
  async savePrediction(playerCode: string, gameId: string, prediction: string, wager?: number) {
    if (!supabase) {
      console.warn('Supabase not configured, skipping prediction save')
      return
    }
    
    // First get player ID
    const { data: player } = await supabase
      .from('players')
      .select('id')
      .eq('player_code', playerCode)
      .single()
    
    if (!player) throw new Error('Player not found')
    
    // Upsert prediction
    const { error } = await supabase
      .from('predictions')
      .upsert({
        player_id: player.id,
        game_id: gameId,
        prediction: prediction,
        wager: wager || 0
      })
    
    if (error) throw error
  },

  // Get player's predictions
  async getPlayerPredictions(playerCode: string) {
    if (!supabase) {
      console.warn('Supabase not configured, returning empty predictions')
      return []
    }
    
    const { data: player } = await supabase
      .from('players')
      .select('id')
      .eq('player_code', playerCode)
      .single()
    
    if (!player) return []
    
    const { data, error } = await supabase
      .from('predictions')
      .select('*')
      .eq('player_id', player.id)
    
    if (error) throw error
    
    return data
  },

  // Subscribe to real-time leaderboard updates
  subscribeToLeaderboard(callback: (players: any[]) => void) {
    if (!supabase) {
      console.warn('Supabase not configured, returning mock subscription')
      return { unsubscribe: () => {} }
    }
    
    return supabase
      .channel('leaderboard')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'players'
        },
        () => {
          // Reload all players when any change occurs
          this.getAllPlayers().then(players => callback(players))
        }
      )
      .subscribe()
  }
}
