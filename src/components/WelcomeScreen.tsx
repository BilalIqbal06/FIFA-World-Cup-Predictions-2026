import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface WelcomeScreenProps {
  onEnterWithCode: (code: string, username: string) => void
}

export default function WelcomeScreen({ onEnterWithCode }: WelcomeScreenProps) {
  const [username, setUsername] = useState('')
  const [playerCode, setPlayerCode] = useState('')

  useEffect(() => {
    // Load username and player code from localStorage on mount
    const storedUsername = localStorage.getItem('username')
    const storedPlayerCode = localStorage.getItem('playerCode')
    if (storedUsername) {
      setUsername(storedUsername)
    }
    if (storedPlayerCode) {
      setPlayerCode(storedPlayerCode)
    }
  }, [])

  const handleGenerateCode = () => {
    const newCode = uuidv4().substring(0, 8).toUpperCase()
    setPlayerCode(newCode)
  }

  const handleEnter = () => {
    if (username.trim() && playerCode.trim()) {
      onEnterWithCode(playerCode.trim(), username.trim())
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-green-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4">
            ⚽ FIFA World Cup 2026
          </h1>
          <p className="text-2xl text-green-400 font-semibold">
            Multiplayer Prediction Tournament
          </p>
        </div>

        {/* Rules Section */}
        <div className="bg-gray-900/80 backdrop-blur-lg rounded-3xl p-8 mb-8 border-2 border-green-500/30 shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            📜 Tournament Rules
          </h2>
          
          <div className="space-y-4 text-gray-300">
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <h3 className="text-xl font-semibold text-green-400 mb-2">🏆 Objective</h3>
              <p className="text-lg">
                <strong className="text-white">The player with the most points wins the tournament!</strong> 
                Make accurate predictions throughout the World Cup to climb the leaderboard.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <h3 className="text-xl font-semibold text-green-400 mb-2">🎯 Predictions</h3>
              <p className="text-lg">
                Before each match, predict whether the home team will win, away team will win, or if it will be a tie. 
                Correct predictions earn you points based on the match importance.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <h3 className="text-xl font-semibold text-green-400 mb-2">💰 Betting System</h3>
              <p className="text-lg">
                At the start of the tournament, place a bet on which team you think will win the entire World Cup. 
                If your team wins, you gain <strong className="text-green-400">+20 bonus points</strong> to your total. 
                If you're wrong, you don't lose any points. Your bet is private - other players cannot see your selection.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <h3 className="text-xl font-semibold text-green-400 mb-2">🎲 Strategic Play</h3>
              <p className="text-lg">
                <strong className="text-white">Go big or go home towards the end!</strong> 
                As the tournament progresses and the stakes get higher in knockout stages, 
                play strategically. Later matches are worth more points, so save your best predictions for the most important games.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <h3 className="text-xl font-semibold text-green-400 mb-2">👥 Multiplayer</h3>
              <p className="text-lg">
                Compete with friends in real-time! Host a tournament and share your 7-digit code, 
                or join an existing tournament using a code. All predictions and scores are synced across all players.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <h3 className="text-xl font-semibold text-green-400 mb-2">🔒 Ready Lock</h3>
              <p className="text-lg">
                Once you click "Ready" in the lobby, your bet is locked forever and cannot be changed. 
                Make sure you're confident in your selection before confirming!
              </p>
            </div>
          </div>
        </div>

        {/* Username and Player Code Input */}
        <div className="bg-gray-900/80 backdrop-blur-lg rounded-3xl p-8 mb-8 border-2 border-green-500/30 shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            � Enter Your Details
          </h2>
          <p className="text-gray-400 mb-6 text-center text-lg">
            Enter your username and your unique player code to join the tournament
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-white text-lg mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                  localStorage.setItem('username', e.target.value)
                }}
                placeholder="Enter your username"
                className="w-full bg-gray-800 border-2 border-gray-700 rounded-xl px-4 py-4 text-white text-lg focus:border-green-500 focus:outline-none transition-colors"
                maxLength={20}
              />
            </div>
            
            <div>
              <label className="block text-white text-lg mb-2">Player Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={playerCode}
                  onChange={(e) => {
                    setPlayerCode(e.target.value.toUpperCase())
                    localStorage.setItem('playerCode', e.target.value.toUpperCase())
                  }}
                  placeholder="Enter your 8-character code"
                  className="flex-1 bg-gray-800 border-2 border-gray-700 rounded-xl px-4 py-4 text-white text-lg focus:border-green-500 focus:outline-none transition-colors uppercase"
                  maxLength={8}
                />
                <button
                  onClick={handleGenerateCode}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-4 rounded-xl text-lg font-semibold transition-colors"
                >
                  Generate
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enter Button */}
        <div className="flex justify-center">
          <button
            onClick={handleEnter}
            disabled={!username.trim() || !playerCode.trim()}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-2xl font-bold py-6 px-12 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200 border-2 border-green-400/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🎮 Enter Tournament
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 space-y-2">
          <p className="text-gray-500 text-sm">
            Connect with players across different networks using the invite code system
          </p>
          <button
            onClick={() => {
              localStorage.removeItem('playerId')
              window.location.reload()
            }}
            className="text-gray-600 hover:text-gray-400 text-xs underline"
          >
            Reset Player ID (for testing multiple players)
          </button>
        </div>
      </div>
    </div>
  )
}
