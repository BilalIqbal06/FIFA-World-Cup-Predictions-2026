# FIFA World Cup Tournament - Recreation Plan

This document provides a comprehensive guide to recreate the FIFA World Cup Tournament prediction game from scratch.

## Project Overview

A real-time multiplayer web application where players can:
- Host or join FIFA World Cup prediction tournaments
- Place bets on teams to win
- Track points and compete with friends
- Switch between multiple active tournaments
- Experience real-time synchronization via Socket.IO

## Tech Stack

### Frontend
- **React 19.2.4** - UI framework
- **TypeScript 6.0.2** - Type safety
- **Vite 8.0.4** - Build tool and dev server
- **TailwindCSS 4.2.2** - Styling
- **Socket.IO Client 4.8.3** - Real-time communication
- **UUID 14.0.0** - Unique ID generation

### Backend
- **Node.js 18+** - Runtime environment
- **Socket.IO 4.8.3** - WebSocket server
- **CORS 2.8.5** - Cross-origin resource sharing
- **In-memory storage** - Tournament data (Map-based)

### Development Tools
- **Concurrently 8.2.2** - Run frontend and backend together
- **ESLint 9.39.4** - Code linting
- **PostCSS 8.5.10** - CSS processing
- **Autoprefixer 10.5.0** - CSS vendor prefixes

## Project Structure

```
fifa-world-cup-tournament/
├── server/
│   ├── server.js              # Socket.IO server (212 lines)
│   └── package.json           # Backend dependencies
├── src/
│   ├── components/
│   │   ├── TournamentApp.tsx  # Main app controller (393 lines)
│   │   ├── WelcomeScreen.tsx  # Entry screen
│   │   ├── HostScreen.tsx     # Create tournament
│   │   ├── JoinScreen.tsx     # Join tournament
│   │   └── LobbyScreen.tsx    # Pre-game lobby
│   ├── services/
│   │   └── multiplayerService.ts  # Socket.IO client wrapper (114 lines)
│   ├── types/
│   │   └── tournament.ts       # TypeScript interfaces (91 lines)
│   ├── FifaWorldCup.tsx       # Main tournament UI (77KB - large file)
│   ├── App.tsx                # Root component
│   ├── main.tsx               # Entry point
│   └── index.css              # Global styles
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── vt-logo.svg
├── package.json               # Frontend dependencies
├── vite.config.ts             # Vite configuration
├── tailwind.config.js         # Tailwind configuration
├── tsconfig.json             # TypeScript config
├── .env.example               # Environment variables template
└── index.html                # HTML entry point
```

## Step-by-Step Recreation Guide

### Phase 1: Project Setup

1. **Initialize project directory**
   ```bash
   mkdir fifa-world-cup-tournament
   cd fifa-world-cup-tournament
   ```

2. **Initialize frontend with Vite**
   ```bash
   npm create vite@latest . -- --template react-ts
   ```

3. **Install frontend dependencies**
   ```bash
   npm install react react-dom socket.io-client uuid cors
   npm install -D @types/react @types/react-dom @types/node tailwindcss postcss autoprefixer concurrently eslint typescript-eslint
   ```

4. **Initialize TailwindCSS**
   ```bash
   npx tailwindcss init -p
   ```

5. **Create server directory and initialize**
   ```bash
   mkdir server
   cd server
   npm init -y
   npm install socket.io cors
   cd ..
   ```

### Phase 2: Configuration Files

6. **Update root package.json scripts**
   ```json
   {
     "scripts": {
       "dev": "concurrently \"npm run server\" \"vite\"",
       "server": "node server/server.js",
       "build": "tsc -b && vite build",
       "lint": "eslint .",
       "preview": "vite preview"
     }
   }
   ```

7. **Configure TailwindCSS (tailwind.config.js)**
   ```javascript
   export default {
     content: [
       "./index.html",
       "./src/**/*.{js,ts,jsx,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```

8. **Configure Vite (vite.config.ts)**
   ```typescript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
     base: process.env.GITHUB_PAGES_BASE_PATH || '/',
   })
   ```

9. **Create .env.example**
   ```
   VITE_SOCKET_SERVER_URL=http://localhost:3001
   ```

### Phase 3: Backend Implementation

10. **Create server/server.js** - Socket.IO server with:
    - HTTP server setup
    - CORS configuration
    - In-memory tournament storage (Map)
    - Socket event handlers:
      - `create-tournament` - Create new tournament
      - `join-tournament` - Player joins existing tournament
      - `update-tournament` - Update tournament details
      - `player-ready` - Mark player as ready
      - `player-bet` - Place team bet
      - `start-tournament` - Begin tournament (host only)
    - Room-based communication
    - Disconnect handling

11. **Update server/package.json**
   ```json
   {
     "main": "server.js",
     "scripts": {
       "start": "node server.js",
       "dev": "node server.js"
     },
     "engines": {
       "node": ">=18.0.0"
     }
   }
   ```

### Phase 4: Type Definitions

12. **Create src/types/tournament.ts** with:
    - `ScreenType` - Union type for screens
    - `Player` interface - Player data structure
    - `Tournament` interface - Tournament data structure
    - `TournamentState` interface - App state
    - `Team` interface - Team data
    - `WORLD_CUP_TEAMS` constant - 48 teams with flags

### Phase 5: Multiplayer Service

13. **Create src/services/multiplayerService.ts** - Singleton service with:
    - Socket.IO client connection
    - Event emission methods
    - Event callback registration
    - Tournament-specific methods:
      - `createTournament()`
      - `joinTournament()`
      - `updateTournament()`
      - `playerReady()`
      - `playerBet()`
      - `startTournament()`
    - Player ID management via UUID
    - Reconnection logic

### Phase 6: Frontend Components

14. **Create src/components/WelcomeScreen.tsx**
    - Entry screen with username input
    - Host or Join options
    - Clean, modern UI with TailwindCSS

15. **Create src/components/HostScreen.tsx**
    - Tournament name input
    - Tournament code generation
    - Host creation handler

16. **Create src/components/JoinScreen.tsx**
    - Tournament code input
    - Join validation
    - Error handling

17. **Create src/components/LobbyScreen.tsx**
    - Display tournament info
    - Show connected players
    - Team selection for betting
    - Ready button
    - Start tournament button (host only)
    - League switcher for multiple tournaments

18. **Create src/components/TournamentApp.tsx** - Main controller with:
    - Screen state management
    - Tournament state management
    - Multiplayer service integration
    - Event listeners for socket events
    - Handler functions for all actions
    - League switching logic
    - Active tournaments map

### Phase 7: Main Tournament UI

19. **Create src/FifaWorldCup.tsx** - Large component (~77KB) with:
    - Tournament bracket visualization
    - Match display and results
    - Points calculation
    - Team standings
    - Interactive match predictions
    - Real-time updates
    - Responsive design

### Phase 8: Entry Points

20. **Update src/main.tsx**
    ```typescript
    import { StrictMode } from 'react'
    import { createRoot } from 'react-dom/client'
    import './index.css'
    import App from './App.tsx'

    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
    ```

21. **Update src/App.tsx**
    ```typescript
    import TournamentApp from './components/TournamentApp'

    function App() {
      return <TournamentApp />
    }

    export default App
    ```

22. **Update src/index.css** - Add Tailwind directives
    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

### Phase 9: Styling and Assets

23. **Add public assets**
    - favicon.svg
    - icons.svg
    - vt-logo.svg (or custom logo)

24. **Apply TailwindCSS styling throughout components**
    - Use gradient backgrounds
    - Modern card designs
    - Responsive layouts
    - Hover effects
    - Modal dialogs

### Phase 10: Testing and Deployment

25. **Local development**
   ```bash
   npm run dev
   ```
   - Frontend runs on http://localhost:5173
   - Backend runs on http://localhost:3001

26. **Build for production**
   ```bash
   npm run build
   ```

27. **Deploy to Vercel (frontend)**
   - Connect GitHub repository
   - Set framework preset to Vite
   - Add environment variable: `VITE_SOCKET_SERVER_URL`

28. **Deploy to Render (backend)**
   - Connect GitHub repository
   - Set root directory to `server`
   - Set start command to `node server.js`
   - Add environment variables: `PORT`, `ALLOWED_ORIGINS`

29. **Update CORS configuration**
   - Add Vercel URL to backend `ALLOWED_ORIGINS`

## Key Features to Implement

### Core Functionality
- **Tournament Creation**: Host creates tournament with unique code
- **Tournament Joining**: Players join via code
- **Team Betting**: Players select team to win (+20 points if correct)
- **Ready System**: Players mark ready before tournament starts
- **Real-time Sync**: All actions sync via Socket.IO
- **Multiple Leagues**: Players can participate in multiple tournaments simultaneously

### UI/UX Features
- **Screen Navigation**: Welcome → Host/Join → Lobby → Tournament
- **League Switcher**: Modal to switch between active tournaments
- **Player List**: Show all connected players with status
- **Team Selection**: Grid of 48 World Cup teams with flags
- **Responsive Design**: Works on desktop and mobile
- **Modern Styling**: Gradients, shadows, hover effects

### Technical Features
- **In-memory Storage**: Fast tournament data access
- **Room-based Communication**: Efficient Socket.IO rooms
- **UUID Generation**: Unique player and tournament IDs
- **Type Safety**: Full TypeScript coverage
- **Error Handling**: Join validation, disconnect handling
- **Reconnection Logic**: Automatic reconnection attempts

## Data Structures

### Tournament
```typescript
{
  id: string              // UUID
  code: string            // 6-character join code
  name: string            // Tournament name
  hostId: string          // Host player ID
  players: Player[]       // Array of players
  status: 'lobby' | 'in_progress' | 'finished'
  createdAt: Date
}
```

### Player
```typescript
{
  id: string              // UUID
  username: string
  isHost: boolean
  isReady: boolean
  betTeamId?: string      // Selected team ID
  betTeamName?: string    // Selected team name
  points: number          // Current points
}
```

### Team
```typescript
{
  id: string              // 2-letter country code
  name: string            // Country name
  flag: string            // Emoji flag
}
```

## Socket.IO Events

### Client → Server
- `create-tournament` - Create new tournament
- `join-tournament` - Join existing tournament
- `update-tournament` - Update tournament details
- `player-ready` - Mark player as ready
- `player-bet` - Place team bet
- `start-tournament` - Begin tournament

### Server → Client
- `tournament-created` - Tournament created successfully
- `player-joined` - New player joined
- `tournament-updated` - Tournament data updated
- `player-ready` - Player marked ready
- `player-bet` - Player placed bet
- `tournament-started` - Tournament began
- `join-error` - Join failed with error

## Environment Variables

### Frontend (.env)
```
VITE_SOCKET_SERVER_URL=http://localhost:3001
```

### Backend (Render Environment Variables)
```
PORT=10000
ALLOWED_ORIGINS=http://localhost:5173,https://your-vercel-url.vercel.app
```

## Important Notes

### Limitations
- **In-memory storage**: Data lost on server restart
- **No persistence**: Consider adding database for production
- **Single server**: Not horizontally scalable
- **No authentication**: Players identified by UUID only

### Production Considerations
- Add PostgreSQL/MongoDB for persistence
- Implement user authentication
- Add rate limiting
- Implement proper error logging
- Add monitoring and analytics
- Use Redis for scalable Socket.IO
- Add HTTPS/WSS for secure connections

### Free Tier Limitations
- Render free tier: 15-minute timeout for inactive services
- First request after timeout may be slow (cold start)
- Consider using keep-alive pings or upgrade to paid tier

## Development Workflow

1. **Start development server**
   ```bash
   npm run dev
   ```

2. **Test locally**
   - Open http://localhost:5173 in multiple browser windows
   - Test hosting and joining tournaments
   - Verify real-time synchronization
   - Test league switching

3. **Build and test production**
   ```bash
   npm run build
   npm run preview
   ```

4. **Deploy to staging**
   - Deploy backend to Render first
   - Note the server URL
   - Deploy frontend to Vercel with server URL
   - Update backend CORS with frontend URL

5. **Test production**
   - Open production URL
   - Test with multiple users
   - Verify all features work

## Troubleshooting

### Common Issues

**Socket connection fails**
- Check backend is running on correct port
- Verify CORS configuration
- Check firewall settings

**Tournament not syncing**
- Verify Socket.IO room joining
- Check event listener registration
- Ensure player ID consistency

**Build errors**
- Clear node_modules and reinstall
- Check TypeScript configuration
- Verify all imports are correct

**Deployment issues**
- Check environment variables
- Verify build command
- Check deployment logs

## Additional Resources

- [Socket.IO Documentation](https://socket.io/docs/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vite.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## Conclusion

This recreation plan provides all necessary information to rebuild the FIFA World Cup Tournament application from scratch. Follow the phases sequentially, test each component thoroughly, and refer to the original code for implementation details when needed.

The application demonstrates modern full-stack development practices with real-time multiplayer functionality, type safety, and responsive design.
