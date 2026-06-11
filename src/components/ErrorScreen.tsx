interface ErrorScreenProps {
  errorMessage: string
  onBack: () => void
}

export default function ErrorScreen({ errorMessage, onBack }: ErrorScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-red-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-8xl mb-4">⚠️</div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Error Joining Tournament
          </h1>
          <p className="text-xl text-red-400">
            {errorMessage}
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-gray-900/80 backdrop-blur-lg rounded-3xl p-8 border-2 border-red-500/30 shadow-2xl">
          {/* Error Details */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-red-400 mb-4">🚫 What went wrong?</h3>
            <p className="text-gray-300 mb-4">
              {errorMessage === 'Invalid tournament code' 
                ? 'The tournament code you entered does not exist. Please check the code and try again.'
                : errorMessage === 'Tournament has already started'
                ? 'This tournament has already started and is no longer accepting new players.'
                : 'An error occurred while trying to join the tournament.'}
            </p>
          </div>

          {/* Suggestions */}
          <div className="bg-gray-800/50 rounded-xl p-6 mb-8 border border-gray-700">
            <h3 className="text-xl font-semibold text-red-400 mb-4">💡 Suggestions</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold">•</span>
                <span>Double-check the tournament code with the host</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold">•</span>
                <span>Make sure the tournament hasn't already started</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold">•</span>
                <span>Ask the host to share a fresh invite code</span>
              </li>
            </ul>
          </div>

          {/* Action Button */}
          <button
            onClick={onBack}
            className="w-full bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white text-xl font-semibold py-4 px-6 rounded-xl transition-all shadow-lg"
          >
            ← Go Back
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-gray-500 text-sm">
          <p>If you believe this is an error, please contact the tournament host</p>
        </div>
      </div>
    </div>
  )
}
