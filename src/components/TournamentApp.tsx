import { useState, useEffect } from 'react'
import WelcomeScreen from './WelcomeScreen'
import ErrorScreen from './ErrorScreen'
import FifaWorldCup from '../FifaWorldCup'
import { supabaseService } from '../services/supabaseService'
import type { Player, ScreenType } from '../types/tournament'

// Mobile responsive styles for TournamentApp
const tournamentMobileStyles = `
  html, body, #root {
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
    box-sizing: border-box;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  @media (max-width: 768px) {
    .tournament-header .flex.items-center.justify-between {
      flex-direction: column;
      gap: 1rem;
      align-items: flex-start;
    }

    .tournament-header .flex.items-center.gap-4 {
      flex-direction: column;
      align-items: stretch;
      gap: 0.5rem;
      width: 100%;
    }

    .tournament-header button {
      width: 100%;
      white-space: normal;
    }

    .tournament-header h1 {
      font-size: 1.25rem !important;
    }

    .tournament-header p {
      font-size: 0.875rem !important;
    }

    .tournament-header .bg-yellow-500\\/20 {
      width: 100%;
      justify-content: space-between;
    }
  }
`

export default function TournamentApp() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('welcome')
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)
  const [playerCode, setPlayerCode] = useState<string>('')
  const [allPlayers, setAllPlayers] = useState<Player[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [predictions, setPredictions] = useState<Map<string, any>>(new Map())
  const [predictionsLoading, setPredictionsLoading] = useState(true)
  const [allPredictions, setAllPredictions] = useState<Map<string, Map<string, any>>>(new Map())

  // Load persisted state on mount with retry logic
  useEffect(() => {
    const storedPlayerCode = localStorage.getItem('playerCode')
    const storedUsername = localStorage.getItem('username')
    const storedScreen = localStorage.getItem('currentScreen') as ScreenType

    if (storedPlayerCode && storedUsername) {
      setPlayerCode(storedPlayerCode)
      
      // Fetch player data from Supabase with retry logic
      const fetchPlayerWithRetry = async (retryCount = 0) => {
        try {
          const data = await supabaseService.getPlayer(storedPlayerCode)
          if (data) {
            setCurrentPlayer(data)
            setPlayerCode(storedPlayerCode)
            loadAllPlayers()
            loadPredictions(storedPlayerCode)
            loadAllPredictionsForFinishedGames()
            setCurrentScreen(storedScreen || 'tournament')
          } else {
            // Player not found, go to welcome screen
            console.warn('⚠️ Player not found in Supabase, clearing localStorage')
            localStorage.removeItem('playerCode')
            localStorage.removeItem('username')
            setCurrentScreen('welcome')
          }
        } catch (err) {
          console.error('❌ Error fetching player (attempt', retryCount + 1, '):', err)
          if (retryCount < 1) {
            setTimeout(() => fetchPlayerWithRetry(retryCount + 1), 1000)
          } else {
            console.error('❌ Failed after retry, showing error screen')
            setErrorMessage('Failed to load your data. Please try again.')
            setCurrentScreen('error')
          }
        } finally {
          setIsLoading(false)
        }
      }
      
      fetchPlayerWithRetry()
    } else {
      setIsLoading(false)
    }
  }, [])

  // Inject mobile styles
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = tournamentMobileStyles
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  // Load all players for leaderboard
  const loadAllPlayers = () => {
    supabaseService.getAllPlayers().then(players => {
      setAllPlayers(players)
    }).catch(err => console.error('Error loading players:', err))
  }

  // Load predictions from Supabase
  const loadPredictions = async (code: string) => {
    if (!code) {
      setPredictionsLoading(false)
      return
    }
    setPredictionsLoading(true)
    try {
      const predictionsData = await supabaseService.getPlayerPredictions(code)
      const predictionsMap = new Map()

      predictionsData.forEach((pred: any) => {
        const gameId = String(pred.game_id) // Normalize to string to match game.id
        predictionsMap.set(gameId, {
          gameId,
          prediction: pred.prediction,
          timestamp: new Date(pred.created_at),
          wager: pred.wager
        })
      })

      setPredictions(predictionsMap)
    } catch (err) {
      console.error('❌ Failed to load predictions from Supabase:', err)
      setPredictions(new Map()) // Set empty predictions on error
    } finally {
      setPredictionsLoading(false)
    }
  }

  // Load all predictions for finished games (for leaderboard display)
  const loadAllPredictionsForFinishedGames = async () => {
    try {
      // Import sampleGames to get finished game IDs
      const { sampleGames } = await import('../FifaWorldCup')
      const finishedGameIds = sampleGames
        .filter((g: any) => g.status === 'finished')
        .map((g: any) => g.id)

      console.log('🔍 Loading predictions for finished games:', finishedGameIds)

      if (finishedGameIds.length === 0) {
        return
      }

      const allPredictionsData = await supabaseService.getPredictionsForGames(finishedGameIds)
      console.log('📊 Received predictions data:', allPredictionsData.length, 'predictions')

      const allPredictionsMap = new Map<string, Map<string, any>>()

      allPredictionsData.forEach((pred: any) => {
        const gameId = String(pred.game_id)
        // Handle both RPC response (username directly) and fallback (players.username)
        const username = pred.username || pred.players?.username

        if (!username) return

        if (!allPredictionsMap.has(gameId)) {
          allPredictionsMap.set(gameId, new Map())
        }

        allPredictionsMap.get(gameId)!.set(username, {
          prediction: pred.prediction,
          wager: pred.wager
        })
      })

      console.log('📋 Built allPredictionsMap with', allPredictionsMap.size, 'games')
      setAllPredictions(allPredictionsMap)
    } catch (err) {
      console.error('❌ Failed to load all predictions for finished games:', err)
    }
  }

  // Subscribe to real-time leaderboard updates
  useEffect(() => {
    if (currentScreen === 'tournament') {
      const subscription = supabaseService.subscribeToLeaderboard((players) => {
        setAllPlayers(players)
      })
      return () => {
        if (subscription && subscription.unsubscribe) {
          subscription.unsubscribe()
        }
      }
    }
  }, [currentScreen])

  // Handle player code entry
  const handleEnterWithCode = async (code: string, username: string) => {
    setPlayerCode(code)
    localStorage.setItem('playerCode', code)
    localStorage.setItem('username', username)

    try {
      // Try to fetch existing player
      let player = await supabaseService.getPlayer(code)

      if (!player) {
        // Create new player
        player = await supabaseService.createPlayer(code, username)
      }

      setCurrentPlayer(player)
      setPlayerCode(code)
      loadAllPlayers()
      loadPredictions(code)
      setCurrentScreen('tournament')
      localStorage.setItem('currentScreen', 'tournament')
    } catch (err) {
      console.error('Error creating/fetching player:', err)
      setErrorMessage('Failed to connect. Please try again.')
      setCurrentScreen('error')
    }
  }

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('playerCode')
    localStorage.removeItem('username')
    localStorage.removeItem('currentScreen')
    setPlayerCode('')
    setCurrentPlayer(null)
    setAllPlayers([])
    setCurrentScreen('welcome')
  }

  // Handle bet placement
  const handlePlaceBet = async (teamId: string, teamName: string) => {
    if (!currentPlayer) return
    
    try {
      const updatedPlayer = await supabaseService.updateWinnerPick(playerCode, teamId, teamName)
      setCurrentPlayer(updatedPlayer)
      loadAllPlayers()
    } catch (err) {
      console.error('Error saving bet:', err)
    }
  }

  // Handle prediction
  const handlePrediction = async (gameId: string, prediction: string, wager?: number) => {
    if (!currentPlayer) return

    try {
      await supabaseService.savePrediction(playerCode, gameId, prediction, wager)
      loadAllPlayers()
      loadPredictions(playerCode)
    } catch (err) {
      console.error('Error saving prediction:', err)
    }
  }

  // Handle back from error
  const handleBackFromError = () => {
    setErrorMessage('')
    setCurrentScreen('welcome')
  }

  // Handle retry from error screen
  const handleRetry = () => {
    setErrorMessage('')
    setIsLoading(true)
    const storedPlayerCode = localStorage.getItem('playerCode')
    const storedUsername = localStorage.getItem('username')
    const storedScreen = localStorage.getItem('currentScreen') as ScreenType

    if (storedPlayerCode && storedUsername) {
      setPlayerCode(storedPlayerCode)
      const fetchPlayerWithRetry = async () => {
        try {
          const data = await supabaseService.getPlayer(storedPlayerCode)
          if (data) {
            setCurrentPlayer(data)
            loadAllPlayers()
            loadPredictions(storedPlayerCode)
            setCurrentScreen(storedScreen || 'tournament')
          } else {
            console.warn('⚠️ Player not found in Supabase (retry), clearing localStorage')
            localStorage.removeItem('playerCode')
            localStorage.removeItem('username')
            setCurrentScreen('welcome')
          }
        } catch (err) {
          console.error('❌ Error fetching player on retry:', err)
          setErrorMessage('Failed to load your data. Please try again.')
          setCurrentScreen('error')
        } finally {
          setIsLoading(false)
        }
      }
      fetchPlayerWithRetry()
    } else {
      setIsLoading(false)
      setCurrentScreen('welcome')
    }
  }

  // Render loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-950 via-blue-950 to-red-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">⚽</div>
          <h2 className="text-2xl font-bold text-white">Loading Tournament...</h2>
        </div>
      </div>
    )
  }

  // Render appropriate screen
  if (currentScreen === 'welcome') {
    return (
      <WelcomeScreen
        onEnterWithCode={handleEnterWithCode}
      />
    )
  }

  if (currentScreen === 'error') {
    return (
      <ErrorScreen
        errorMessage={errorMessage}
        onBack={handleBackFromError}
        onRetry={handleRetry}
      />
    )
  }

  if (currentScreen === 'tournament' && currentPlayer) {
    return (
      <div>
        {/* Tournament Header */}
        <div className="tournament-header bg-gradient-to-r from-green-950 via-blue-950 to-red-950 border-b border-yellow-500/30 py-4 px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">FIFA World Cup 2026</h1>
              <p className="text-sm text-gray-400">Playing as: {currentPlayer.username}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg px-4 py-2">
                <span className="text-yellow-200 text-sm">Your Code:</span>
                <span className="text-yellow-400 font-bold ml-2">{playerCode}</span>
              </div>
              <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg px-4 py-2">
                <span className="text-yellow-200 text-sm">Your Bet:</span>
                <span className="text-yellow-400 font-bold ml-2">
                  {currentPlayer.betTeamName ? `${currentPlayer.betTeamName} (+20 if wins)` : 'None'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {predictionsLoading && currentPlayer ? (
          <div className="min-h-screen bg-gradient-to-br from-green-950 via-blue-950 to-red-950 flex items-center justify-center">
            <div className="text-white text-center">
              <h2 className="text-2xl font-bold mb-2">Loading Predictions...</h2>
              <p className="text-gray-400">Please wait while we fetch your predictions</p>
            </div>
          </div>
        ) : (
          <FifaWorldCup
            key={`${currentPlayer.id}-${Array.from(predictions.keys()).join(',')}`}
            currentPlayer={currentPlayer}
            allPlayers={allPlayers}
            predictions={predictions}
            allPredictions={allPredictions}
            onPlaceBet={handlePlaceBet}
            onPrediction={(gameId, prediction, wager) => handlePrediction(gameId, prediction, wager)}
          />
        )}
      </div>
    )
  }

  return null
}
