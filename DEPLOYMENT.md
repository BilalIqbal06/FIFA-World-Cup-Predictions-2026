# Deployment Guide

This application consists of two parts:
1. **Frontend** - React/Vite application (deployed to Vercel)
2. **Backend** - Socket.IO server with Prisma database (deployed to Render)

## Prerequisites
- Node.js 18+
- npm
- GitHub account
- Vercel account
- Render account
- PostgreSQL database (Render PostgreSQL, Supabase, Neon, or other provider)

## Step 1: Set Up Database

### Option A: Use Render PostgreSQL (Recommended)
Since you're deploying the backend to Render, using Render PostgreSQL is the easiest option:
1. Go to [Render.com](https://render.com) and sign up
2. Click "New +" and select "PostgreSQL"
3. Configure:
   - **Name**: fifa-world-cup-db
   - **Database**: PostgreSQL
   - **Region**: Choose region closest to your users
4. Click "Create Database"
5. Wait for database to be created
6. Copy the **Internal Database URL** from the database dashboard

### Option B: Use Supabase
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

### Option C: Use Neon
1. Go to [Neon.tech](https://neon.tech) and sign up
2. Create a new project
3. Configure:
   - **Project Name**: fifa-world-cup-db
   - **Region**: Choose region closest to your users
4. Click "Create Project"
5. Wait for project to be created
6. Copy the **Connection String** from the dashboard

### Option D: Use Other PostgreSQL Providers
You can also use Railway, PlanetScale, ElephantSQL, or any other PostgreSQL provider. Get the connection string from your provider.

## Step 2: Deploy Backend to Render

1. **Important**: Before deploying, update `server/prisma/schema.prisma` to use PostgreSQL:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
   Commit this change to your repository.

2. Push your code to GitHub
3. Go to [Render.com](https://render.com) and sign up
4. Click "New +" and select "Web Service"
5. Connect your GitHub repository
6. Configure:
   - **Name**: fifa-world-cup-server
   - **Root Directory**: `server`
   - **Build Command**: `npm install && npx prisma generate`
   - **Start Command**: `node server.js`
   - **Environment Variables**:
     - `PORT`: `10000`
     - `DATABASE_URL`: Your PostgreSQL connection string (from Step 1 - Render, Supabase, Neon, etc.)
     - `ALLOWED_ORIGINS`: `https://your-frontend-url.vercel.app` (update after frontend deployment)
     - `NODE_ENV`: `production`
7. Click "Deploy Web Service"
8. Wait for deployment to complete and copy the server URL (e.g., `https://fifa-world-cup-server.onrender.com`)

## Step 3: Deploy Frontend to Vercel

1. Go to [Vercel.com](https://vercel.com) and sign up
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `./`
   - **Environment Variables**:
     - `VITE_SOCKET_SERVER_URL`: `https://fifa-world-cup-server.onrender.com` (use your Render server URL)
5. Click "Deploy"
6. Wait for deployment to complete and copy the Vercel URL

## Step 4: Update Backend CORS

1. Go back to your Render dashboard
2. Find your fifa-world-cup-server service
3. Click "Environment"
4. Update `ALLOWED_ORIGINS` to include your Vercel URL:
   - `https://your-frontend-url.vercel.app`
5. Click "Save Changes"
6. Render will automatically redeploy

## Step 5: Run Database Migrations

After the backend is deployed, you need to run the Prisma migrations:

1. Go to your Render dashboard
2. Find your fifa-world-cup-server service
3. Click "Shell" (or use SSH)
4. Run the following commands:
   ```bash
   npx prisma migrate deploy
   ```
5. This will apply all pending migrations to your production database

## Step 6: Test

1. Open your Vercel URL in a browser
2. Enter a username and try hosting/joining a tournament
3. Test with multiple users in different browsers/devices
4. Verify that data persists across page refreshes

## Important Notes

- **Database**: The application uses PostgreSQL (Render PostgreSQL, Supabase, or Neon recommended) for production data persistence
- **Render PostgreSQL Benefits**: Easiest to set up since you're deploying to Render, free tier available
- **Supabase Benefits**: Free tier with generous limits, built-in auth and storage
- **Neon Benefits**: Serverless PostgreSQL with auto-scaling, free tier available
- **Free Tier Limits**: Render's free tier has a 15-minute timeout for inactive services
- **Cold Starts**: The first request after timeout may take longer as the server spins up
- **CORS**: Ensure your ALLOWED_ORIGINS includes your Vercel URL
- **Environment Variables**: Never commit .env files to version control

## Monitoring

- Monitor your Render dashboard for server health and logs
- Check database usage in your PostgreSQL provider's dashboard (Render, Supabase, Neon, etc.)
- Set up alerts for high error rates or downtime

## Scaling Considerations

For higher traffic:
- Upgrade to Render's paid tiers for better performance
- Consider using a CDN for static assets
- Implement rate limiting on the server
- Add database connection pooling

## Local Development

To run locally with SQLite:
```bash
npm install
npm run dev
```

To run locally with PostgreSQL:
1. Set `DATABASE_URL` in server/.env to your PostgreSQL connection string
2. Run migrations: `cd server && npx prisma migrate dev`
3. Start the server: `npm run dev`
