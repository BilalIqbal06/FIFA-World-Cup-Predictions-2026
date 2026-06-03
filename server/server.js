const { createServer } = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

const httpServer = createServer()
const PORT = process.env.PORT || 3001

// Allow CORS from any origin in development, or specific origins in production
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:5173', 'http://localhost:3000']

const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true
  }
})

// In-memory tournament storage
const tournaments = new Map() // code -> Tournament
const playerToTournament = new Map() // playerId -> tournamentCode

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id)

  socket.on('message', (data) => {
    const { type, payload, playerId } = data
    console.log('Received message:', type, playerId)

    switch (type) {
      case 'create-tournament':
        handleCreateTournament(socket, playerId, payload.tournament)
        break
      case 'join-tournament':
        handleJoinTournament(socket, playerId, payload.code, payload.player)
        break
      case 'update-tournament':
        handleUpdateTournament(socket, playerId, payload.tournament)
        break
      case 'player-ready':
        handlePlayerReady(socket, playerId)
        break
      case 'player-bet':
        handlePlayerBet(socket, playerId, payload.teamId, payload.teamName)
        break
      case 'start-tournament':
        handleStartTournament(socket, playerId)
        break
      default:
        console.log('Unknown message type:', type)
    }
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id)
    handleDisconnect(socket.id)
  })
})

function handleCreateTournament(socket, playerId, tournament) {
  tournaments.set(tournament.code, tournament)
  playerToTournament.set(playerId, tournament.code)
  
  socket.join(tournament.code)
  
  console.log('Tournament created:', tournament.code)
  
  socket.emit('room-message', {
    type: 'tournament-created',
    payload: { tournament }
  })
}

function handleJoinTournament(socket, playerId, code, player) {
  const tournament = tournaments.get(code)
  
  if (!tournament) {
    socket.emit('room-message', {
      type: 'join-error',
      payload: { error: 'Invalid tournament code' }
    })
    return
  }

  if (tournament.status !== 'lobby') {
    socket.emit('room-message', {
      type: 'join-error',
      payload: { error: 'Tournament has already started' }
    })
    return
  }

  // Add player to tournament
  tournament.players.push(player)
  playerToTournament.set(playerId, code)
  
  socket.join(code)
  
  console.log('Player joined tournament:', code, player.username)
  
  // Notify all players in the tournament
  io.to(code).emit('room-message', {
    type: 'player-joined',
    payload: { player, tournament }
  })
}

function handleUpdateTournament(socket, playerId, updatedTournament) {
  const code = playerToTournament.get(playerId)
  if (!code) return

  const tournament = tournaments.get(code)
  if (!tournament) return

  // Update tournament
  tournaments.set(code, updatedTournament)
  
  // Broadcast to all players
  io.to(code).emit('room-message', {
    type: 'tournament-updated',
    payload: { tournament: updatedTournament }
  })
}

function handlePlayerReady(socket, playerId) {
  const code = playerToTournament.get(playerId)
  if (!code) return

  const tournament = tournaments.get(code)
  if (!tournament) return

  // Update player ready status
  const player = tournament.players.find(p => p.id === playerId)
  if (player) {
    player.isReady = true
    
    tournaments.set(code, tournament)
    
    // Broadcast to all players
    io.to(code).emit('room-message', {
      type: 'player-ready',
      payload: { playerId, tournament }
    })
  }
}

function handlePlayerBet(socket, playerId, teamId, teamName) {
  const code = playerToTournament.get(playerId)
  if (!code) return

  const tournament = tournaments.get(code)
  if (!tournament) return

  // Update player bet
  const player = tournament.players.find(p => p.id === playerId)
  if (player) {
    player.betTeamId = teamId
    player.betTeamName = teamName
    
    tournaments.set(code, tournament)
    
    // Broadcast to all players
    io.to(code).emit('room-message', {
      type: 'player-bet',
      payload: { playerId, teamId, teamName, tournament }
    })
  }
}

function handleStartTournament(socket, playerId) {
  const code = playerToTournament.get(playerId)
  if (!code) return

  const tournament = tournaments.get(code)
  if (!tournament) return

  // Verify player is host
  if (tournament.hostId !== playerId) {
    return
  }

  // Check host is ready (allows single-player mode)
  const host = tournament.players.find(p => p.id === playerId)
  if (!host || !host.isReady) {
    return
  }

  // Start tournament
  tournament.status = 'in_progress'
  tournaments.set(code, tournament)
  
  console.log('Tournament started:', code)
  
  // Broadcast to all players
  io.to(code).emit('room-message', {
    type: 'tournament-started',
    payload: { tournament }
  })
}

function handleDisconnect(socketId) {
  // Note: In a production app, you'd want to handle player disconnections
  // and potentially remove them from tournaments after a timeout
  console.log('Handling disconnect for:', socketId)
}

httpServer.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`)
})
