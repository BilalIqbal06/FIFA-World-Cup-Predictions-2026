import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export const scoringService = {
  /**
   * Calculate match scores for all unscored matches
   * This function is idempotent - running it multiple times won't award duplicate points
   */
  async calculateMatchScores() {

    // Fetch all unscored match results
    const { data: unscoredMatches, error: matchesError } = await supabase
      .from('match_results')
      .select('*')
      .eq('scored', false)

    if (matchesError) {
      console.error('Error fetching unscored matches:', matchesError)
      throw matchesError
    }

    if (!unscoredMatches || unscoredMatches.length === 0) {
      return
    }


    for (const match of unscoredMatches) {
      await this.scoreMatch(match)
    }

  },

  /**
   * Score a single match
   */
  async scoreMatch(match: any) {

    // Fetch all predictions for this match
    const { data: predictions, error: predictionsError } = await supabase
      .from('predictions')
      .select('*, player_id, players!inner(username)')
      .eq('game_id', match.game_id)

    if (predictionsError) {
      console.error('Error fetching predictions:', predictionsError)
      throw predictionsError
    }

    if (!predictions || predictions.length === 0) {
      await this.markMatchAsScored(match.id)
      return
    }


    // Calculate points for each prediction
    for (const prediction of predictions) {
      const points = this.calculatePoints(prediction, match)
      
      // Update player points
      const { data: player, error: fetchError } = await supabase
        .from('players')
        .select('points')
        .eq('id', prediction.player_id)
        .single()

      if (fetchError) {
        console.error('Error fetching player points:', fetchError)
        throw fetchError
      }

      const { error: updateError } = await supabase
        .from('players')
        .update({ 
          points: player.points + points
        })
        .eq('id', prediction.player_id)

      if (updateError) {
        console.error('Error updating player points:', updateError)
        throw updateError
      }

    }

    // Mark match as scored
    await this.markMatchAsScored(match.id)
  },

  /**
   * Calculate points for a single prediction based on match result
   */
  calculatePoints(prediction: any, match: any): number {
    const predictionText = prediction.prediction.toLowerCase()
    const result = match.result

    // Handle draw
    if (result === 'draw') {
      if (predictionText === 'draw') {
        return 4 // Correct draw prediction
      } else {
        return 1 // Incorrect prediction but match was draw
      }
    }

    // Handle knockout wagering
    if (prediction.wager && prediction.wager > 0) {
      // Knockout games: normal points + wager
      const basePoints = predictionText === result ? 3 : 0
      if (predictionText === result) {
        return basePoints + prediction.wager // Correct prediction: normal points + wager
      } else {
        return basePoints - prediction.wager // Incorrect prediction: normal points - wager
      }
    }

    // Regular match scoring
    if (predictionText === result) {
      return 3 // Correct winner prediction
    } else {
      return 0 // Incorrect prediction
    }
  },

  /**
   * Mark a match as scored to prevent duplicate scoring
   */
  async markMatchAsScored(matchId: string) {
    const { error } = await supabase
      .from('match_results')
      .update({ 
        scored: true,
        scored_at: new Date().toISOString()
      })
      .eq('id', matchId)

    if (error) {
      console.error('Error marking match as scored:', error)
      throw error
    }

  },

  /**
   * Apply World Cup winner bonus after the final
   * This function is idempotent - running it multiple times won't award duplicate points
   */
  async applyWinnerBonus(winnerTeamName: string) {

    // Fetch all players who haven't received the bonus yet
    const { data: players, error: playersError } = await supabase
      .from('players')
      .select('*')
      .eq('winner_pick_scored', false)
      .not('winner_pick_team_name', 'is', null)

    if (playersError) {
      console.error('Error fetching players:', playersError)
      throw playersError
    }

    if (!players || players.length === 0) {
      return
    }


    let correctCount = 0
    let incorrectCount = 0

    for (const player of players) {
      const isCorrect = player.winner_pick_team_name === winnerTeamName
      const points = isCorrect ? 20 : 0

      // Update player points
      const { data: playerData, error: fetchError } = await supabase
        .from('players')
        .select('points')
        .eq('id', player.id)
        .single()

      if (fetchError) {
        console.error('Error fetching player points:', fetchError)
        throw fetchError
      }

      const { error: updateError } = await supabase
        .from('players')
        .update({ 
          points: playerData.points + points,
          winner_pick_scored: true
        })
        .eq('id', player.id)

      if (updateError) {
        console.error('Error updating player points:', updateError)
        throw updateError
      }

      if (isCorrect) {
        correctCount++
      } else {
        incorrectCount++
      }
    }

  },

  /**
   * Import match result and trigger scoring
   */
  async importMatchResult(matchResult: {
    game_id: string
    home_team: string
    away_team: string
    home_score: number
    away_score: number
    result: 'home_win' | 'away_win' | 'draw'
  }) {

    // Check if match result already exists
    const { data: existing, error: existingError } = await supabase
      .from('match_results')
      .select('*')
      .eq('game_id', matchResult.game_id)
      .single()

    if (existing && !existingError) {
      return
    }

    // Insert match result
    const { error: insertError } = await supabase
      .from('match_results')
      .insert({
        game_id: matchResult.game_id,
        home_team: matchResult.home_team,
        away_team: matchResult.away_team,
        home_score: matchResult.home_score,
        away_score: matchResult.away_score,
        result: matchResult.result,
        scored: false
      })

    if (insertError) {
      console.error('Error inserting match result:', insertError)
      throw insertError
    }


    // Trigger scoring for this match
    await this.calculateMatchScores()
  }
}
