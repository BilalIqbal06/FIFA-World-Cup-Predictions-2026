# FIFA World Cup 2026 Prediction Tournament - Setup Guide

A single-league multiplayer prediction tournament for the FIFA World Cup 2026. Players compete on a shared leaderboard by predicting match outcomes and the tournament winner.

## Features

- **Single Global League**: All players compete in one shared leaderboard
- **Player Code System**: Each player gets a unique 8-character code for identity
- **Match Predictions**: Predict outcomes for individual matches with point-based scoring
- **Tournament Winner Pick**: Bonus prediction (+20 points if correct)
- **Real-time Leaderboard**: Live updates as players make predictions
- **Persistent Sessions**: Return anytime with your player code

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Supabase (PostgreSQL + Real-time)
- **Deployment**: Vercel
- **Source Control**: GitHub

## Prerequisites

- Node.js 18+ 
- GitHub account
- Supabase account (free tier)
- Vercel account (free tier)

## Setup Instructions

### 1. Supabase Setup

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to Project Settings → API
4. Copy your Project URL and anon/public key

### 2. Create Database Tables

In Supabase SQL Editor, run:

```sql
-- Players table
CREATE TABLE players (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  player_code VARCHAR(8) UNIQUE NOT NULL,
  username VARCHAR(50) NOT NULL,
  winner_pick_team_id VARCHAR(10),
  winner_pick_team_name VARCHAR(100),
  winner_pick_locked BOOLEAN DEFAULT FALSE,
  points INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Predictions table
CREATE TABLE predictions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  game_id VARCHAR(50) NOT NULL,
  prediction VARCHAR(10) NOT NULL,
  wager INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(player_id, game_id)
);

-- Enable RLS (Row Level Security)
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE predictions ENABLE ROW LEVEL SECURITY;

-- Simple policies for now (TODO: Add stronger security later)
CREATE POLICY "Players can read all" ON players FOR SELECT USING (true);
CREATE POLICY "Players can insert" ON players FOR INSERT WITH CHECK (true);
CREATE POLICY "Players can update own" ON players FOR UPDATE USING (true);

CREATE POLICY "Predictions can read all" ON predictions FOR SELECT USING (true);
CREATE POLICY "Predictions can insert" ON predictions FOR INSERT WITH CHECK (true);
CREATE POLICY "Predictions can update own" ON predictions FOR UPDATE USING (true);
```

### 3. Local Development

1. Clone this repository
2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Add your Supabase credentials to `.env`:
```
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

5. Start development server:
```bash
npm run dev
```

### 4. Vercel Deployment

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add environment variables in Vercel settings:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key
4. Deploy

## How It Works

1. **Player Entry**: Users enter username and generate/get a player code
2. **Winner Pick**: Players select which team they think will win the tournament (+20 bonus if correct)
3. **Match Predictions**: Players predict outcomes for individual matches
4. **Leaderboard**: Real-time updates showing all players ranked by points
5. **Persistence**: Players can return anytime using their player code

## Scoring Rules

- **Correct match prediction**: 3 points
- **Tie game prediction**: 2 points
- **Wrong prediction**: 0 points
- **Tournament winner pick**: +20 bonus points if correct
- **Knockout rounds**: Can wager points on predictions (risk/reward system)

## Security Notes

- Current RLS policies are simplified for functionality
- TODO: Implement stronger security with proper authentication
- Players can currently only access their own data through their player code
- Leaderboard is shared and visible to all players

## License

MIT
