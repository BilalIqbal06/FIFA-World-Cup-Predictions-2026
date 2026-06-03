import { io, Socket } from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid'
import type { Tournament, Player } from '../types/tournament'

// Using local Socket.IO server for multiplayer sync
const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL || 'http://localhost:3001'

class MultiplayerService {
  private socket: Socket | null = null
  private playerId: string
  private callbacks: Map<string, Function[]> = new Map()

  constructor() {
    this.playerId = uuidv4()
  }

  connect() {
    if (this.socket?.connected) return

    this.socket = io(SOCKET_SERVER_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    })

    this.socket.on('connect', () => {
      console.log('Connected to multiplayer server')
    })

    this.socket.on('disconnect', () => {
      console.log('Disconnected from multiplayer server')
    })

    this.socket.on('room-message', (data: any) => {
      const { type, payload } = data
      this.triggerCallback(type, payload)
    })

    this.socket.on('error', (error: any) => {
      console.error('Socket error:', error)
    })
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }

  private emit(type: string, payload: any) {
    if (this.socket?.connected) {
      this.socket.emit('message', { type, payload, playerId: this.playerId })
    }
  }

  private triggerCallback(type: string, payload: any) {
    const callbacks = this.callbacks.get(type) || []
    callbacks.forEach(callback => callback(payload))
  }

  on(type: string, callback: Function) {
    if (!this.callbacks.has(type)) {
      this.callbacks.set(type, [])
    }
    this.callbacks.get(type)!.push(callback)
  }

  off(type: string, callback: Function) {
    const callbacks = this.callbacks.get(type) || []
    const index = callbacks.indexOf(callback)
    if (index > -1) {
      callbacks.splice(index, 1)
    }
  }

  // Tournament-specific methods
  createTournament(tournament: Tournament) {
    this.emit('create-tournament', { tournament })
  }

  joinTournament(code: string, player: Player) {
    this.emit('join-tournament', { code, player })
  }

  updateTournament(tournament: Tournament) {
    this.emit('update-tournament', { tournament })
  }

  playerReady(playerId: string) {
    this.emit('player-ready', { playerId })
  }

  playerBet(playerId: string, teamId: string, teamName: string) {
    this.emit('player-bet', { playerId, teamId, teamName })
  }

  startTournament() {
    this.emit('start-tournament', {})
  }

  getPlayerId(): string {
    return this.playerId
  }

  isConnected(): boolean {
    return this.socket?.connected || false
  }
}

// Singleton instance
export const multiplayerService = new MultiplayerService()
