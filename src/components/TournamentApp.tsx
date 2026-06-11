import { useState, useEffect } from 'react'
import WelcomeScreen from './WelcomeScreen'
import ErrorScreen from './ErrorScreen'
import FifaWorldCup from '../FifaWorldCup'
import { supabaseService } from '../services/supabaseService'
import type { Player, ScreenType } from '../types/tournament'

export default function TournamentApp() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('welcome')
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)
  const [playerCode, setPlayerCode] = useState<string>('')
  const [allPlayers, setAllPlayers] = useState<Player[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Load persisted state on mount with retry logic
  useEffect(() => {
    const storedPlayerCode = localStorage.getItem('playerCode')
    const storedUsername = localStorage.getItem('username')
    const storedScreen = localStorage.getItem('currentScreen') as ScreenType

    if (storedPlayerCode && storedUsername) {
      console.log('🔄 Restoring session from localStorage:', { storedPlayerCode, storedUsername })
      setPlayerCode(storedPlayerCode)
      
      // Fetch player data from Supabase with retry logic
      const fetchPlayerWithRetry = async (retryCount = 0) => {
        try {
          const data = await supabaseService.getPlayer(storedPlayerCode)
          if (data) {
            console.log('✅ Player restored from Supabase:', data)
            setCurrentPlayer(data)
            loadAllPlayers()
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
            console.log('🔄 Retrying get_player...')
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

  // Load all players for leaderboard
  const loadAllPlayers = () => {
    supabaseService.getAllPlayers().then(players => {
      setAllPlayers(players)
    }).catch(err => console.error('Error loading players:', err))
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
      loadAllPlayers()
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
            console.log('✅ Player restored from Supabase (retry):', data)
            setCurrentPlayer(data)
            loadAllPlayers()
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
        <div className="bg-gradient-to-r from-green-950 via-blue-950 to-red-950 border-b border-yellow-500/30 py-4 px-6">
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

        <FifaWorldCup 
          currentPlayer={currentPlayer} 
          allPlayers={allPlayers}
          onPlaceBet={handlePlaceBet}
          onPrediction={(gameId, prediction, wager) => handlePrediction(gameId, prediction, wager)}
        />
      </div>
    )
  }

  return null
}
