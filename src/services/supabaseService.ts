import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables. Please check your .env file or Vercel env vars.')
  // Don't throw error - allow app to load without Supabase for testing
} else {
}

export const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

export const supabaseService = {
  // Get player by player code (using RPC function)
  async getPlayer(playerCode: string) {
    if (!supabase) {
      console.error('❌ Supabase not configured, returning null player')
      return null
    }
    
    const { data, error } = await supabase
      .rpc('get_player', { p_player_code: playerCode })
    
    if (error) {
      console.error('❌ RPC get_player failed:', error)
      if (error.code === 'PGRST116') {
        return null // Player not found
      }
      throw error
    }
    
    if (!data || data.length === 0) {
      console.warn('⚠️ get_player returned no data')
      return null
    }
    
    const player = data[0]
    return {
      id: player.id,
      username: player.username,
      betTeamId: player.winner_pick_team_id,
      betTeamName: player.winner_pick_team_name,
      points: player.points
    }
  },

  // Create new player (using RPC function)
  async createPlayer(playerCode: string, username: string) {
    if (!supabase) {
      console.error('❌ Supabase not configured, returning mock player')
      return {
        id: 'mock-id',
        username: username,
        betTeamId: undefined,
        betTeamName: undefined,
        points: 0
      }
    }
    
    const { data, error } = await supabase
      .rpc('create_player', { 
        p_player_code: playerCode, 
        p_username: username 
      })
    
    if (error) {
      console.error('❌ RPC create_player failed:', error)
      throw error
    }
    
    if (!data || data.length === 0) {
      console.error('❌ create_player returned no data')
      throw new Error('Failed to create player')
    }
    
    const player = data[0]
    return {
      id: player.id,
      username: player.username,
      betTeamId: player.winner_pick_team_id,
      betTeamName: player.winner_pick_team_name,
      points: player.points
    }
  },

  // Get all players for leaderboard
  async getAllPlayers() {
    if (!supabase) {
      console.warn('Supabase not configured, returning empty players list')
      return []
    }
    
    // Use public_leaderboard view to avoid exposing private data
    const { data, error } = await supabase
      .from('public_leaderboard')
      .select('*')
    
    if (error) throw error
    
    return data.map(player => ({
      id: player.username, // Use username as ID since view doesn't expose UUID
      username: player.username,
      points: player.points,
      betTeamName: undefined // Winner picks are private, not exposed in view
    }))
  },

  // Update winner pick (locked after first submission) - using RPC function
  async updateWinnerPick(playerCode: string, teamId: string, teamName: string) {
    if (!supabase) {
      console.error('❌ Supabase not configured, returning mock player')
      return {
        id: 'mock-id',
        username: 'mock',
        betTeamId: teamId,
        betTeamName: teamName,
        points: 0
      }
    }
    
    const { data, error } = await supabase
      .rpc('update_winner_pick', { 
        p_player_code: playerCode,
        p_team_id: teamId,
        p_team_name: teamName
      })
    
    if (error) {
      console.error('❌ RPC update_winner_pick failed:', error)
      throw error
    }
    
    if (!data || data.length === 0) {
      console.error('❌ update_winner_pick returned no data')
      throw new Error('Failed to update winner pick')
    }
    
    const player = data[0]
    return {
      id: player.id,
      username: player.username,
      betTeamId: player.winner_pick_team_id,
      betTeamName: player.winner_pick_team_name,
      points: player.points
    }
  },

  // Save prediction for a game (using RPC function)
  async savePrediction(playerCode: string, gameId: string, prediction: string, wager?: number) {
    if (!supabase) {
      console.error('❌ Supabase not configured, skipping prediction save')
      return
    }
    
    const { error } = await supabase
      .rpc('save_prediction', { 
        p_player_code: playerCode,
        p_game_id: gameId,
        p_prediction: prediction,
        p_wager: wager || 0
      })
    
    if (error) {
      console.error('❌ RPC save_prediction failed:', error)
      throw error
    }
  },

  // Get player's predictions (using RPC function)
  async getPlayerPredictions(playerCode: string) {
    if (!supabase) {
      console.error('❌ Supabase not configured, returning empty predictions')
      return []
    }

    const { data, error } = await supabase
      .rpc('get_player_predictions', { p_player_code: playerCode })

    if (error) {
      console.error('❌ RPC get_player_predictions failed:', error)
      throw error
    }
    
    return data || []
  },

  // Get all predictions for specific games (for leaderboard display)
  async getPredictionsForGames(gameIds: string[]) {
    if (!supabase) {
      console.error('❌ Supabase not configured, returning empty predictions')
      return []
    }

    // Use RPC function to get public predictions (bypasses RLS restrictions)
    const { data, error } = await supabase
      .rpc('get_public_predictions', { p_game_ids: gameIds })

    if (error) {
      console.error('❌ Failed to get predictions for games:', error)
      return []
    }

    return data || []
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
