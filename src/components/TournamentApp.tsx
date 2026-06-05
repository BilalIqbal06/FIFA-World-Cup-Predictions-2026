import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import WelcomeScreen from './WelcomeScreen'
import HostScreen from './HostScreen'
import JoinScreen from './JoinScreen'
import LobbyScreen from './LobbyScreen'
import FifaWorldCup from '../FifaWorldCup'
import { multiplayerService } from '../services/multiplayerService'
import type { Tournament, Player, ScreenType } from '../types/tournament'

export default function TournamentApp() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('welcome')
  const [tournament, setTournament] = useState<Tournament | null>(null)
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)
  const [activeTournaments, setActiveTournaments] = useState<Map<string, { tournament: Tournament, player: Player }>>(new Map())
  const [showLeagueSwitcher, setShowLeagueSwitcher] = useState(false)
  const [globalUsername, setGlobalUsername] = useState('')

  const handleReset = () => {
    setActiveTournaments(new Map())
    setTournament(null)
    setCurrentPlayer(null)
    setCurrentScreen('welcome')
    setGlobalUsername('')
    setShowLeagueSwitcher(false)
  }

  // Reset on mount
  useEffect(() => {
    handleReset()
  }, [])

  useEffect(() => {
    multiplayerService.connect()

    // Listen for tournament updates
    multiplayerService.on('tournament-updated', (updatedTournament: Tournament) => {
      setTournament(updatedTournament)
    })

    multiplayerService.on('player-joined', (data: { player: Player, tournament: Tournament }) => {
      setTournament(data.tournament)
      // Save to active tournaments when player joins
      if (data.player.id === multiplayerService.getPlayerId()) {
        setActiveTournaments(prev => new Map(prev).set(data.tournament.id, { tournament: data.tournament, player: data.player }))
      }
    })

    multiplayerService.on('player-ready', (data: { playerId: string, tournament: Tournament }) => {
      setTournament(data.tournament)
      if (currentPlayer?.id === data.playerId) {
        setCurrentPlayer(prev => prev ? { ...prev, isReady: true } : null)
        // Update active tournaments map
        setActiveTournaments(prev => {
          const newMap = new Map(prev)
          if (newMap.has(data.tournament.id)) {
            const existing = newMap.get(data.tournament.id)!
            newMap.set(data.tournament.id, {
              tournament: data.tournament,
              player: { ...existing.player, isReady: true }
            })
          }
          return newMap
        })
      }
    })

    multiplayerService.on('player-bet', (data: { playerId: string, teamId: string, teamName: string, tournament: Tournament }) => {
      setTournament(data.tournament)
      if (currentPlayer?.id === data.playerId) {
        setCurrentPlayer(prev => prev ? { ...prev, betTeamId: data.teamId, betTeamName: data.teamName } : null)
        // Update active tournaments map
        setActiveTournaments(prev => {
          const newMap = new Map(prev)
          if (newMap.has(data.tournament.id)) {
            const existing = newMap.get(data.tournament.id)!
            newMap.set(data.tournament.id, {
              tournament: data.tournament,
              player: { ...existing.player, betTeamId: data.teamId, betTeamName: data.teamName }
            })
          }
          return newMap
        })
      }
    })

    multiplayerService.on('tournament-started', (updatedTournament: Tournament) => {
      setTournament(updatedTournament)
      setCurrentScreen('tournament')
    })

    return () => {
      multiplayerService.disconnect()
    }
  }, [currentPlayer?.id])

  const handleHost = (username: string, code: string, tournamentName: string) => {
    setGlobalUsername(username)
    const playerId = multiplayerService.getPlayerId()
    const newPlayer: Player = {
      id: playerId,
      username: username,
      isHost: true,
      isReady: false,
      points: 0,
    }

    const newTournament: Tournament = {
      id: uuidv4(),
      code,
      name: tournamentName,
      hostId: playerId,
      players: [newPlayer],
      status: 'lobby',
      createdAt: new Date(),
    }

    setTournament(newTournament)
    setCurrentPlayer(newPlayer)
    setCurrentScreen('lobby')

    // Save to active tournaments
    setActiveTournaments(prev => new Map(prev).set(newTournament.id, { tournament: newTournament, player: newPlayer }))

    // Notify multiplayer service
    multiplayerService.createTournament(newTournament)
  }

  const handleJoin = (username: string, code: string) => {
    setGlobalUsername(username)
    const playerId = multiplayerService.getPlayerId()
    const newPlayer: Player = {
      id: playerId,
      username: username,
      isHost: false,
      isReady: false,
      points: 0,
    }

    setCurrentPlayer(newPlayer)
    setCurrentScreen('lobby')

    // Join tournament via multiplayer service
    multiplayerService.joinTournament(code, newPlayer)
  }

  const handleUpdateTournamentName = (name: string) => {
    if (!tournament) return
    const updated = { ...tournament, name }
    setTournament(updated)
    multiplayerService.updateTournament(updated)
  }

  const handlePlaceBet = (teamId: string, teamName: string) => {
    if (!tournament || !currentPlayer) return
    const updatedPlayer = { ...currentPlayer, betTeamId: teamId, betTeamName: teamName }
    setCurrentPlayer(updatedPlayer)

    // Update active tournaments map with new bet
    setActiveTournaments(prev => {
      const newMap = new Map(prev)
      if (tournament && newMap.has(tournament.id)) {
        const existing = newMap.get(tournament.id)!
        newMap.set(tournament.id, {
          tournament: existing.tournament,
          player: updatedPlayer
        })
      }
      return newMap
    })

    multiplayerService.playerBet(currentPlayer.id, teamId, teamName)
  }

  const handleReady = () => {
    if (!currentPlayer) return
    const updatedPlayer = { ...currentPlayer, isReady: true }
    setCurrentPlayer(updatedPlayer)

    // Update active tournaments map with ready status
    setActiveTournaments(prev => {
      const newMap = new Map(prev)
      if (tournament && newMap.has(tournament.id)) {
        const existing = newMap.get(tournament.id)!
        newMap.set(tournament.id, {
          tournament: existing.tournament,
          player: updatedPlayer
        })
      }
      return newMap
    })

    multiplayerService.playerReady(currentPlayer.id)
  }

  const handleStartTournament = () => {
    if (!tournament) return
    console.log('Starting tournament:', tournament.id)
    const updated = { ...tournament, status: 'in_progress' as const }
    setTournament(updated)
    console.log('Setting screen to tournament')
    setCurrentScreen('tournament')
    console.log('Calling multiplayerService.startTournament')
    multiplayerService.startTournament()
    console.log('Screen set to:', 'tournament')
  }

  const handleLeave = () => {
    // Remove current tournament from active tournaments
    if (tournament) {
      setActiveTournaments(prev => {
        const newMap = new Map(prev)
        newMap.delete(tournament.id)
        return newMap
      })
    }
    
    multiplayerService.disconnect()
    setCurrentScreen('welcome')
    setTournament(null)
    setCurrentPlayer(null)
  }

  const handleSwitchLeague = (tournamentId: string) => {
    const leagueData = activeTournaments.get(tournamentId)
    if (leagueData) {
      setTournament(leagueData.tournament)
      setCurrentPlayer(leagueData.player)
      setShowLeagueSwitcher(false)

      // Always navigate to tournament homepage when clicking on a league
      setCurrentScreen('tournament')
    }
  }

  const handleAddNewLeague = () => {
    setShowLeagueSwitcher(false)
    setCurrentScreen('welcome')
  }

  // Render appropriate screen
  if (currentScreen === 'welcome') {
    return (
      <WelcomeScreen
        onHost={(username) => {
          setGlobalUsername(username)
          setCurrentScreen('host')
        }}
        onJoin={(username) => {
          setGlobalUsername(username)
          setCurrentScreen('join')
        }}
      />
    )
  }

  if (currentScreen === 'host') {
    return (
      <HostScreen
        onHostCreated={handleHost}
        onBack={() => setCurrentScreen('welcome')}
        username={globalUsername}
      />
    )
  }

  if (currentScreen === 'join') {
    return (
      <JoinScreen
        onJoin={handleJoin}
        onBack={() => setCurrentScreen('welcome')}
        username={globalUsername}
      />
    )
  }

  if (currentScreen === 'lobby' && tournament && currentPlayer) {
    return (
      <LobbyScreen
        tournament={tournament}
        currentPlayer={currentPlayer}
        isHost={currentPlayer.isHost}
        activeTournaments={activeTournaments}
        activeTournamentsCount={activeTournaments.size}
        onSwitchToLeague={handleSwitchLeague}
        onAddNewLeague={handleAddNewLeague}
        onUpdateTournamentName={handleUpdateTournamentName}
        onPlaceBet={handlePlaceBet}
        onReady={handleReady}
        onStartTournament={handleStartTournament}
        onLeave={handleLeave}
      />
    )
  }

  if (currentScreen === 'tournament' && tournament && currentPlayer) {
    return (
      <div>
        {/* Tournament Header */}
        <div className="bg-gradient-to-r from-green-950 via-blue-950 to-red-950 border-b border-yellow-500/30 py-4 px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">{tournament.name}</h1>
              <p className="text-sm text-gray-400">Playing as: {currentPlayer.username}</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowLeagueSwitcher(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
              >
                Multiple Leagues ({activeTournaments.size})
              </button>
              <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg px-4 py-2">
                <span className="text-yellow-200 text-sm">Your Bet:</span>
                <span className="text-yellow-400 font-bold ml-2">
                  {currentPlayer.betTeamName ? `${currentPlayer.betTeamName} (+20 if wins)` : 'None'}
                </span>
              </div>
              <button
                onClick={handleLeave}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
              >
                Leave Tournament
              </button>
            </div>
          </div>
        </div>

        {/* League Switcher Modal */}
        {showLeagueSwitcher && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full border-2 border-green-500/50 shadow-2xl">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-white mb-2">🏆 Multiple Leagues</h2>
                <p className="text-green-400 text-lg">Select a league to switch to</p>
              </div>
              
              <div className="space-y-3 mb-6">
                {Array.from(activeTournaments.entries()).map(([id, data]) => (
                  <button
                    key={id}
                    onClick={() => data.tournament.id !== tournament.id && handleSwitchLeague(id)}
                    disabled={data.tournament.id === tournament.id}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      data.tournament.id === tournament.id
                        ? 'bg-gray-700/50 border-gray-600 cursor-not-allowed opacity-60'
                        : 'bg-gray-800 border-gray-700 hover:border-green-500/50 cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className={`text-lg font-semibold ${data.tournament.id === tournament.id ? 'text-gray-400' : 'text-white'}`}>
                          {data.tournament.name}
                          {data.tournament.id === tournament.id && ' (Current)'}
                        </h3>
                        <p className="text-sm text-gray-400">Code: {data.tournament.code}</p>
                      </div>
                      {data.tournament.status === 'in_progress' && (
                        <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">In Progress</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  handleAddNewLeague()
                  setShowLeagueSwitcher(false)
                }}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white text-lg font-semibold py-3 px-6 rounded-xl transition-all"
              >
                + Join/Create New League
              </button>

              <button
                onClick={() => setShowLeagueSwitcher(false)}
                className="w-full mt-3 bg-gray-700 hover:bg-gray-600 text-white text-lg font-semibold py-3 px-6 rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}

        <FifaWorldCup />
      </div>
    )
  }

  return null
}
