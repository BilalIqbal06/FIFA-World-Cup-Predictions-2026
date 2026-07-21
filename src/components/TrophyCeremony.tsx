import { useState, useEffect } from 'react'
import type { Player } from '../types/tournament'

interface TrophyCeremonyProps {
  allPlayers: Player[]
  onViewLeaderboard: () => void
}

type CeremonyStep = 'intro' | 'third' | 'second' | 'first' | 'podium'

export default function TrophyCeremony({ allPlayers, onViewLeaderboard }: TrophyCeremonyProps) {
  const [step, setStep] = useState<CeremonyStep>('intro')
  const [showConfetti, setShowConfetti] = useState(false)

  // Sort players by points (descending)
  const sortedPlayers = [...allPlayers].sort((a, b) => b.points - a.points)
  const top3 = sortedPlayers.slice(0, 3)

  useEffect(() => {
    // Auto-advance through ceremony steps
    const timers: number[] = []

    // Intro -> Third place (2 seconds)
    timers.push(setTimeout(() => {
      setStep('third')
    }, 2000))

    // Third -> Second place (2.5 seconds)
    timers.push(setTimeout(() => {
      setStep('second')
    }, 4500))

    // Second -> First place (2.5 seconds)
    timers.push(setTimeout(() => {
      setStep('first')
      setShowConfetti(true)
    }, 7000))

    // First -> Podium (3 seconds)
    timers.push(setTimeout(() => {
      setStep('podium')
    }, 10000))

    return () => timers.forEach(t => clearTimeout(t))
  }, [])

  const handleReplay = () => {
    setStep('intro')
    setShowConfetti(false)
    // Re-trigger the sequence
    setTimeout(() => setStep('third'), 2000)
    setTimeout(() => setStep('second'), 4500)
    setTimeout(() => {
      setStep('first')
      setShowConfetti(true)
    }, 7000)
    setTimeout(() => setStep('podium'), 10000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-blue-950 to-red-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Confetti */}
      {showConfetti && <Confetti />}

      <div className="max-w-4xl w-full text-center z-10">
        {step === 'intro' && (
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              The 2026 World Cup Prediction Challenge
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 mb-8">
              is complete!
            </h2>
            <div className="text-8xl animate-bounce">🏆</div>
          </div>
        )}

        {step === 'third' && (
          <div className="animate-slide-up">
            <div className="text-6xl mb-4">🥉</div>
            <h2 className="text-3xl md:text-5xl font-bold text-amber-600 mb-4">
              3rd Place
            </h2>
            <p className="text-2xl md:text-4xl font-bold text-white mb-2">
              {top3[2]?.username || 'Unknown'}
            </p>
            <p className="text-xl md:text-2xl text-gray-300">
              {top3[2]?.points || 0} points
            </p>
          </div>
        )}

        {step === 'second' && (
          <div className="animate-slide-up">
            <div className="text-6xl mb-4">🥈</div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-300 mb-4">
              2nd Place
            </h2>
            <p className="text-2xl md:text-4xl font-bold text-white mb-2">
              {top3[1]?.username || 'Unknown'}
            </p>
            <p className="text-xl md:text-2xl text-gray-300">
              {top3[1]?.points || 0} points
            </p>
          </div>
        )}

        {step === 'first' && (
          <div className="animate-scale-up">
            <div className="text-8xl mb-4 animate-pulse">🏆</div>
            <h2 className="text-4xl md:text-6xl font-bold text-yellow-400 mb-4">
              1st Place
            </h2>
            <p className="text-3xl md:text-5xl font-bold text-white mb-2">
              {top3[0]?.username || 'Unknown'}
            </p>
            <p className="text-2xl md:text-3xl text-yellow-300">
              {top3[0]?.points || 0} points
            </p>
          </div>
        )}

        {step === 'podium' && (
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Final Podium
            </h2>
            
            {/* Podium Display */}
            <div className="flex items-end justify-center gap-4 md:gap-8 mb-8">
              {/* 2nd Place */}
              <div className="flex flex-col items-center">
                <div className="text-4xl md:text-5xl mb-2">🥈</div>
                <div className="bg-gradient-to-t from-gray-600 to-gray-400 w-20 md:w-24 h-32 md:h-40 rounded-t-lg flex items-center justify-center border-2 border-gray-300">
                  <div className="text-center">
                    <p className="text-white font-bold text-sm md:text-base">{top3[1]?.username || 'Unknown'}</p>
                    <p className="text-gray-200 text-xs md:text-sm">{top3[1]?.points || 0} pts</p>
                  </div>
                </div>
                <div className="bg-gray-700 w-20 md:w-24 h-4 rounded-b-lg"></div>
              </div>

              {/* 1st Place (Centered and highest) */}
              <div className="flex flex-col items-center -mt-8 md:-mt-12">
                <div className="text-5xl md:text-6xl mb-2 animate-pulse">🏆</div>
                <div className="bg-gradient-to-t from-yellow-600 to-yellow-400 w-24 md:w-28 h-40 md:h-52 rounded-t-lg flex items-center justify-center border-2 border-yellow-300 shadow-lg shadow-yellow-500/50">
                  <div className="text-center">
                    <p className="text-white font-bold text-base md:text-lg">{top3[0]?.username || 'Unknown'}</p>
                    <p className="text-yellow-200 text-sm md:text-base">{top3[0]?.points || 0} pts</p>
                  </div>
                </div>
                <div className="bg-yellow-700 w-24 md:w-28 h-4 rounded-b-lg"></div>
              </div>

              {/* 3rd Place */}
              <div className="flex flex-col items-center">
                <div className="text-4xl md:text-5xl mb-2">🥉</div>
                <div className="bg-gradient-to-t from-amber-700 to-amber-500 w-20 md:w-24 h-24 md:h-32 rounded-t-lg flex items-center justify-center border-2 border-amber-400">
                  <div className="text-center">
                    <p className="text-white font-bold text-sm md:text-base">{top3[2]?.username || 'Unknown'}</p>
                    <p className="text-amber-200 text-xs md:text-sm">{top3[2]?.points || 0} pts</p>
                  </div>
                </div>
                <div className="bg-amber-800 w-20 md:w-24 h-4 rounded-b-lg"></div>
              </div>
            </div>

            <p className="text-xl md:text-2xl text-white mb-8">
              Congratulations to our champion and thank you to everyone who played!
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button
                onClick={onViewLeaderboard}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-all shadow-lg"
              >
                View Final Leaderboard
              </button>
              <button
                onClick={handleReplay}
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-all shadow-lg"
              >
                🔄 Replay Ceremony
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-up {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 1s ease-out;
        }
        .animate-scale-up {
          animation: scale-up 1.5s ease-out;
        }
      `}</style>
    </div>
  )
}

// Simple confetti component
function Confetti() {
  const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8']
  
  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      {Array.from({ length: 100 }).map((_, i) => {
        const color = colors[Math.floor(Math.random() * colors.length)]
        const left = Math.random() * 100
        const animationDuration = 3 + Math.random() * 2
        const animationDelay = Math.random() * 2
        const size = 5 + Math.random() * 10
        
        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              backgroundColor: color,
              left: `${left}%`,
              top: '-20px',
              width: `${size}px`,
              height: `${size}px`,
              animation: `confetti-fall ${animationDuration}s linear ${animationDelay}s infinite`,
            }}
          />
        )
      })}
      <style>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
