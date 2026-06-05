import { useState, useEffect } from 'react'
import { WORLD_CUP_TEAMS } from '../types/tournament'
import type { Tournament, Player } from '../types/tournament'

interface LobbyScreenProps {
  tournament: Tournament
  currentPlayer: Player
  isHost: boolean
  activeTournaments: Map<string, { tournament: Tournament, player: Player }>
  activeTournamentsCount: number
  onSwitchToLeague: (tournamentId: string) => void
  onAddNewLeague: () => void
  onUpdateTournamentName: (name: string) => void
  onPlaceBet: (teamId: string, teamName: string) => void
  onReady: () => void
  onStartTournament: () => void
  onLeave: () => void
}

export default function LobbyScreen({
  tournament,
  currentPlayer,
  isHost,
  activeTournaments,
  activeTournamentsCount,
  onSwitchToLeague,
  onAddNewLeague,
  onUpdateTournamentName,
  onPlaceBet,
  onReady,
  onStartTournament,
  onLeave,
}: LobbyScreenProps) {
  const [selectedBetTeam, setSelectedBetTeam] = useState(currentPlayer.betTeamId || '')
  const [showWarning, setShowWarning] = useState(false)
  const [tournamentName, setTournamentName] = useState(tournament.name)
  const [showLeagueSwitcher, setShowLeagueSwitcher] = useState(false)

  const hostReady = isHost && currentPlayer.isReady

  // Sync local state when switching leagues (only when tournament ID changes)
  useEffect(() => {
    setSelectedBetTeam(currentPlayer.betTeamId || '')
    setTournamentName(tournament.name)
  }, [tournament.id, currentPlayer.id])

  const handleBetChange = (teamId: string) => {
    setSelectedBetTeam(teamId)
    const team = WORLD_CUP_TEAMS.find(t => t.id === teamId)
    if (team) {
      onPlaceBet(teamId, team.name)
    }
  }

  const handleReadyClick = () => {
    if (!currentPlayer.username.trim()) {
      alert('Please enter a username before readying up')
      return
    }
    if (!selectedBetTeam) {
      alert('Please place a bet on a team before readying up')
      return
    }
    setShowWarning(true)
  }

  const handleConfirmReady = () => {
    setShowWarning(false)
    onReady()
  }

  const handleCancelReady = () => {
    setShowWarning(false)
  }

  const handleStartTournament = () => {
    console.log('handleStartTournament called, hostReady:', hostReady)
    if (!hostReady) {
      console.log('Host not ready, but allowing start anyway for debugging')
      // alert('You must be ready before starting the tournament')
      // return
    }
    console.log('Calling onStartTournament')
    onStartTournament()
  }

  const handleTournamentNameChange = (value: string) => {
    setTournamentName(value)
    onUpdateTournamentName(value)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-900 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-5xl font-bold text-white">
              🏟️ Tournament Lobby
            </h1>
            {activeTournamentsCount > 1 && (
              <button
                onClick={() => setShowLeagueSwitcher(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
              >
                Multiple Leagues ({activeTournamentsCount})
              </button>
            )}
          </div>
          <p className="text-xl text-purple-400">
            Code: <span className="font-mono font-bold text-2xl">{tournament.code}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Tournament Info & Players */}
          <div className="space-y-6">
            {/* Tournament Name */}
            <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-6 border-2 border-purple-500/30">
              <label className="block text-lg font-semibold text-white mb-3">
                Tournament Name
              </label>
              {isHost ? (
                <input
                  type="text"
                  value={tournamentName}
                  onChange={(e) => handleTournamentNameChange(e.target.value)}
                  className="w-full bg-gray-800 border-2 border-gray-700 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                  maxLength={50}
                />
              ) : (
                <div className="bg-gray-800 rounded-xl px-4 py-3 text-white text-lg">
                  {tournament.name}
                </div>
              )}
            </div>

            {/* Players List */}
            <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-6 border-2 border-purple-500/30">
              <h2 className="text-2xl font-bold text-white mb-4">
                Players ({tournament.players.length})
              </h2>
              <div className="space-y-3">
                {tournament.players.map((player) => (
                  <div
                    key={player.id}
                    className={`flex items-center justify-between bg-gray-800 rounded-xl p-4 border-2 ${
                      player.id === currentPlayer.id
                        ? 'border-purple-500'
                        : 'border-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        player.isReady ? 'bg-green-500' : 'bg-gray-500'
                      }`} />
                      <span className={`text-lg font-semibold ${
                        player.isReady ? 'text-green-400' : 'text-white'
                      }`}>
                        {player.username}
                        {player.isHost && ' 👑'}
                      </span>
                    </div>
                    {player.isReady && (
                      <span className="text-green-400 text-sm font-semibold">READY</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Leave Button */}
            <button
              onClick={onLeave}
              className="w-full bg-red-600 hover:bg-red-700 text-white text-lg font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              Leave Tournament
            </button>
          </div>

          {/* Right Column - User Settings */}
          <div className="space-y-6">
            {/* Username Display */}
            <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-6 border-2 border-purple-500/30">
              <label className="block text-lg font-semibold text-white mb-3">
                Your Username
              </label>
              <div className="bg-gray-800 rounded-xl px-4 py-3 text-white text-lg">
                {currentPlayer.username}
              </div>
            </div>

            {/* Betting */}
            <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-6 border-2 border-purple-500/30">
              <label className="block text-lg font-semibold text-white mb-3">
                🎰 Bet on Winner
              </label>
              <p className="text-gray-400 mb-4 text-sm">
                Select the team you think will win the entire tournament. 
                If correct, you'll get <span className="text-green-400 font-semibold">+20 bonus points</span>!
              </p>
              <select
                value={selectedBetTeam}
                onChange={(e) => handleBetChange(e.target.value)}
                disabled={currentPlayer.isReady}
                className="w-full bg-gray-800 border-2 border-gray-700 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Select a team...</option>
                {WORLD_CUP_TEAMS.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
              <p className="text-gray-500 mt-2 text-xs">
                Your bet is private - other players cannot see your selection
              </p>
            </div>

            {/* Ready Button */}
            {!currentPlayer.isReady ? (
              <button
                onClick={handleReadyClick}
                disabled={!currentPlayer.username.trim() || !selectedBetTeam}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-xl font-bold py-4 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                ✅ Ready
              </button>
            ) : (
              <div className="w-full bg-green-600 text-white text-xl font-bold py-4 px-6 rounded-xl text-center">
                ✅ You're Ready!
              </div>
            )}

            {/* Start Tournament Button (Host Only) */}
            {isHost && (
              <button
                onClick={handleStartTournament}
                disabled={!hostReady}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white text-xl font-bold py-4 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                🚀 Start Tournament
              </button>
            )}
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
                    onClick={() => {
                      if (data.tournament.id !== tournament.id) {
                        onSwitchToLeague(id)
                        setShowLeagueSwitcher(false)
                      }
                    }}
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
                  onAddNewLeague()
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

        {/* Warning Modal */}
        {showWarning && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full border-2 border-red-500/50 shadow-2xl">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">⚠️</div>
                <h2 className="text-3xl font-bold text-white mb-2">Warning!</h2>
                <p className="text-red-400 text-lg font-semibold">This action cannot be undone</p>
              </div>
              
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
                <p className="text-gray-300">
                  Once you click "Ready", your bet on <strong className="text-white">
                    {WORLD_CUP_TEAMS.find(t => t.id === selectedBetTeam)?.name}
                  </strong> will be <strong className="text-red-400">locked forever</strong>. 
                  You will not be able to change your selection.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleCancelReady}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white text-lg font-semibold py-3 px-6 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmReady}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-lg font-semibold py-3 px-6 rounded-xl transition-all"
                >
                  Confirm Ready
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
