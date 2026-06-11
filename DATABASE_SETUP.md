# Database Setup Instructions

This application uses PostgreSQL with Prisma ORM for production-ready data persistence.

## Database Schema

The database has two tables:

**Tournament**
- id (UUID, primary key)
- code (unique string)
- name
- hostId
- status ('lobby' | 'in_progress' | 'finished')
- createdAt
- players (relation to Player table)

**Player**
- id (UUID, primary key)
- username
- isHost
- isReady
- betTeamId (optional)
- betTeamName (optional)
- points
- tournamentCode (foreign key to Tournament)

## Local Development with SQLite

For local development, you can use SQLite for simplicity:

1. Update `server/prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "sqlite"
     url      = env("DATABASE_URL")
   }
   ```

2. Set `DATABASE_URL` in `server/.env`:
   ```
   DATABASE_URL="file:./dev.db"
   ```

3. Run migrations:
   ```bash
   cd server
   npx prisma generate
   npx prisma migrate dev --name init
   ```

## Production with PostgreSQL

For production deployment, use PostgreSQL. We recommend Render PostgreSQL since you're deploying the backend to Render.

### Option A: Render PostgreSQL (Recommended)

1. Go to [Render.com](https://render.com) and sign up
2. Click "New +" and select "PostgreSQL"
3. Configure:
   - **Name**: fifa-world-cup-db
   - **Database**: PostgreSQL
   - **Region**: Choose region closest to your users
4. Click "Create Database"
5. Wait for database to be created
6. Copy the **Internal Database URL** from the database dashboard

### Option B: Supabase

1. Go to [Supabase.com](https://supabase.com) and sign up
2. Create a new project
3. Configure:
   - **Project Name**: fifa-world-cup-db
   - **Database Password**: Choose a strong password
   - **Region**: Choose region closest to your users
4. Click "Create new project"
5. Wait for project to be created
6. Go to Settings → Database
7. Copy the **Connection String** (use the "URI" format)

### Option C: Neon

1. Go to [Neon.tech](https://neon.tech) and sign up
2. Create a new project
3. Configure:
   - **Project Name**: fifa-world-cup-db
   - **Region**: Choose region closest to your users
4. Click "Create Project"
5. Wait for project to be created
6. Copy the **Connection String** from the dashboard

### Option D: Other PostgreSQL Providers

You can also use Railway, PlanetScale, ElephantSQL, or any other PostgreSQL provider. Get the connection string from your provider.

### Setup Steps

**Important**: The default schema is set to SQLite for local development. For production, you must change the provider to PostgreSQL before deploying.

1. Update `server/prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
   Commit this change to your repository before deploying.

2. Set `DATABASE_URL` in your production environment:
   ```
   DATABASE_URL="postgresql://user:password@host:port/database"
   ```

3. Run migrations on production:
   ```bash
   cd server
   npx prisma generate
   npx prisma migrate deploy
   ```

## Environment Variables

Make sure your `server/.env` file contains:

**For local development (SQLite):**
```
DATABASE_URL="file:./dev.db"
PORT=3001
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

**For production (PostgreSQL with PocketHost):**
```
DATABASE_URL="postgresql://user:password@host:port/database"
PORT=10000
NODE_ENV=production
ALLOWED_ORIGINS=https://your-frontend-url.vercel.app
```

## Testing

After running the migrations, start the server:
```bash
cd server
npm run dev
```

The database will automatically persist tournament data across server restarts.

## Prisma Studio

To view and edit your database visually:
```bash
cd server
npx prisma studio
```

This will open a browser-based database viewer.
