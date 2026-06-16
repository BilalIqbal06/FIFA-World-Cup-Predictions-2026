import { useState, useEffect } from 'react'
import type { Player } from './types/tournament'
import { WORLD_CUP_TEAMS } from './types/tournament'

// Mobile responsive styles
const mobileStyles = `
  /* Base styles to prevent horizontal overflow */
  html, body, #root {
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
    box-sizing: border-box;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  /* Mobile styles - 768px and below */
  @media (max-width: 768px) {
    /* Header stack vertically */
    header .flex.items-center.justify-between {
      flex-direction: column;
      gap: 1rem;
      align-items: flex-start;
    }

    header .flex.items-center.gap-4 {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }

    header .flex.items-center.justify-between > div:last-child {
      width: 100%;
      flex-direction: column;
      align-items: stretch;
      gap: 0.75rem;
    }

    header .flex.items-center.gap-2 {
      width: 100%;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    /* Header buttons - full width on mobile */
    header button {
      width: 100%;
      white-space: normal;
      text-align: center;
    }

    /* Reduce header font sizes */
    header h1 {
      font-size: 1.25rem !important;
      line-height: 1.2;
    }

    header p {
      font-size: 0.75rem !important;
    }

    /* Logo size */
    header img, header svg {
      width: 2.5rem !important;
      height: 2.5rem !important;
    }

    /* Main content padding */
    main {
      padding-left: 0.75rem !important;
      padding-right: 0.75rem !important;
    }

    /* Panel padding */
    .rounded-2xl {
      padding: 0.75rem !important;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
    }

    /* Match cards - stack vertically */
    .grid-cols-2 {
      grid-template-columns: 1fr !important;
    }

    /* Match card container */
    .match-card {
      width: 100% !important;
      max-width: 100% !important;
      box-sizing: border-box !important;
      padding: 0.75rem !important;
    }

    /* Match card header (venue, group, status) */
    .match-card > div:first-child {
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 0.5rem !important;
    }

    .match-card > div:first-child > div:first-child {
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 0.25rem !important;
      width: 100%;
    }

    .match-card > div:first-child > div:last-child {
      width: 100%;
      text-align: left;
    }

    /* Team display - stack vertically */
    .match-card .flex.items-center.justify-between.mb-6 {
      flex-direction: column !important;
      gap: 0.75rem !important;
      align-items: center !important;
    }

    /* Individual team sections */
    .match-card .text-center.flex-1 {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.25rem;
    }

    /* Time/VS section */
    .match-card .text-center.px-4 {
      width: 100%;
      padding: 0.5rem 0 !important;
      background: rgba(59, 130, 246, 0.1);
      border-radius: 0.5rem;
      margin: 0.25rem 0;
    }

    /* Team names - smaller font */
    .match-card .text-lg {
      font-size: 0.875rem !important;
      line-height: 1.2;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    /* Time display */
    .match-card .text-xl {
      font-size: 1rem !important;
    }

    .match-card .text-sm {
      font-size: 0.75rem !important;
    }

    /* Flag images */
    .match-card img.w-16 {
      width: 2rem !important;
      height: 1.5rem !important;
    }

    /* Status badges - no absolute positioning */
    .match-card .px-2.py-1,
    .match-card .px-3.py-1 {
      position: static !important;
      font-size: 0.7rem !important;
      padding: 0.25rem 0.5rem !important;
      white-space: normal;
    }

    /* Prediction buttons - full width */
    .match-card .grid-cols-3 {
      grid-template-columns: 1fr !important;
      gap: 0.5rem !important;
    }

    .match-card button {
      width: 100%;
      padding: 0.625rem !important;
      font-size: 0.8125rem !important;
      white-space: normal;
      line-height: 1.2;
    }

    /* Leaderboard rows */
    .leaderboard-row {
      flex-direction: column;
      align-items: flex-start !important;
      gap: 0.5rem;
    }

    .leaderboard-row > div:last-child {
      width: 100%;
      text-align: right;
    }

    /* Date navigation buttons */
    .flex.gap-2.flex-wrap button {
      flex: 1 1 auto;
      min-width: 70px;
      font-size: 0.75rem;
      padding: 0.5rem 0.5rem;
      white-space: nowrap;
    }

    /* Heading sizes */
    h2 {
      font-size: 1.125rem !important;
      line-height: 1.2;
    }

    h3 {
      font-size: 0.9375rem !important;
      line-height: 1.2;
    }

    /* Rules modal */
    .fixed.inset-0 > div {
      max-height: 90vh;
      overflow-y: auto;
      padding: 0.75rem !important;
    }

    /* Betting panel */
    select {
      font-size: 0.875rem !important;
      padding: 0.625rem !important;
    }

    /* Wager input */
    input[type="number"] {
      font-size: 0.875rem !important;
      padding: 0.5rem !important;
    }

    /* Points display in header */
    header .text-2xl {
      font-size: 1.25rem !important;
    }

    /* VS label between teams */
    .match-card .text-center.px-4::before {
      content: "VS";
      display: block;
      font-size: 0.75rem;
      color: #fbbf24;
      font-weight: bold;
      margin-bottom: 0.25rem;
    }

    /* Complete Tournament Schedule - stack vertically */
    .schedule-row {
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 0.5rem !important;
    }

    .schedule-row .flex.items-center.gap-4 {
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 0.25rem !important;
      width: 100%;
    }

    .schedule-row .flex.items-center.gap-4:last-child {
      flex-direction: row !important;
      flex-wrap: wrap !important;
      align-items: center !important;
      gap: 0.5rem !important;
    }

    .schedule-row img {
      width: 1.5rem !important;
      height: 1.125rem !important;
    }

    .schedule-row .text-white.font-bold {
      font-size: 0.875rem !important;
    }

    .schedule-row .text-yellow-400.font-bold {
      font-size: 0.75rem !important;
    }
  }

  /* Small mobile - 480px and below */
  @media (max-width: 480px) {
    /* Further reduce header */
    header h1 {
      font-size: 1.125rem !important;
    }

    header p {
      font-size: 0.6875rem !important;
    }

    /* Further reduce padding */
    main {
      padding-left: 0.5rem !important;
      padding-right: 0.5rem !important;
    }

    .rounded-2xl {
      padding: 0.5rem !important;
    }

    .match-card {
      padding: 0.5rem !important;
    }

    /* Even smaller buttons */
    button {
      font-size: 0.75rem !important;
      padding: 0.5rem !important;
    }

    /* Team names */
    .match-card .text-lg {
      font-size: 0.75rem !important;
    }

    /* Date display */
    .text-3xl {
      font-size: 1.25rem !important;
    }

    /* Points display */
    .text-2xl {
      font-size: 1.125rem !important;
    }

    /* Flags */
    .match-card img.w-16 {
      width: 1.75rem !important;
      height: 1.3125rem !important;
    }

    /* Status badges */
    .match-card .px-2.py-1,
    .match-card .px-3.py-1 {
      font-size: 0.625rem !important;
      padding: 0.1875rem 0.375rem !important;
    }
  }
`

type GameStatus = 'upcoming' | 'live' | 'finished'
type PredictionType = 'home' | 'away' | 'tie'

interface Team {
  id: string
  name: string
  flag: string
}

interface Game {
  id: string
  homeTeam: Team
  awayTeam: Team
  date: Date
  venue: string
  group: string
  status: GameStatus
  actualResult?: PredictionType
}

// Official FIFA World Cup 2026 Schedule (June 11 - July 19, 2026)
// All times in Eastern Time (ET/EDT, UTC-4)
// Source: openfootball/worldcup.json (official FIFA schedule)
const sampleGames: Game[] = [
  // Thursday, 11 June 2026
  {
    id: '1',
    homeTeam: { id: 'mx', name: 'Mexico', flag: '🇲🇽' },
    awayTeam: { id: 'za', name: 'South Africa', flag: '🇿🇦' },
    date: new Date('2026-06-11T15:00:00-04:00'),
    venue: 'Mexico City',
    group: 'Group A',
    status: 'upcoming'
  },
  {
    id: '2',
    homeTeam: { id: 'kr', name: 'Korea Republic', flag: '🇰🇷' },
    awayTeam: { id: 'cz', name: 'Czech Republic', flag: '🇨🇿' },
    date: new Date('2026-06-11T22:00:00-04:00'),
    venue: 'Guadalajara',
    group: 'Group A',
    status: 'upcoming'
  },
  // Friday, 12 June 2026
  {
    id: '3',
    homeTeam: { id: 'ca', name: 'Canada', flag: '🇨🇦' },
    awayTeam: { id: 'ba', name: 'Bosnia & Herzegovina', flag: '🇧🇦' },
    date: new Date('2026-06-12T15:00:00-04:00'),
    venue: 'Toronto',
    group: 'Group B',
    status: 'upcoming'
  },
  {
    id: '4',
    homeTeam: { id: 'us', name: 'USA', flag: '🇺🇸' },
    awayTeam: { id: 'py', name: 'Paraguay', flag: '🇵🇾' },
    date: new Date('2026-06-12T21:00:00-04:00'),
    venue: 'Inglewood',
    group: 'Group D',
    status: 'upcoming'
  },
  // Saturday, 13 June 2026
  {
    id: '5',
    homeTeam: { id: 'ht', name: 'Haiti', flag: '🇭🇹' },
    awayTeam: { id: 'gb-sct', name: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
    date: new Date('2026-06-13T21:00:00-04:00'),
    venue: 'Boston',
    group: 'Group C',
    status: 'upcoming'
  },
  {
    id: '6',
    homeTeam: { id: 'au', name: 'Australia', flag: '🇦🇺' },
    awayTeam: { id: 'tr', name: 'Turkey', flag: '🇹🇷' },
    date: new Date('2026-06-14T00:00:00-04:00'),
    venue: 'Vancouver',
    group: 'Group D',
    status: 'upcoming'
  },
  {
    id: '7',
    homeTeam: { id: 'br', name: 'Brazil', flag: '🇧🇷' },
    awayTeam: { id: 'ma', name: 'Morocco', flag: '🇲🇦' },
    date: new Date('2026-06-13T18:00:00-04:00'),
    venue: 'New York/New Jersey',
    group: 'Group C',
    status: 'upcoming'
  },
  {
    id: '8',
    homeTeam: { id: 'qa', name: 'Qatar', flag: '🇶🇦' },
    awayTeam: { id: 'ch', name: 'Switzerland', flag: '🇨🇭' },
    date: new Date('2026-06-13T15:00:00-04:00'),
    venue: 'San Francisco Bay Area',
    group: 'Group B',
    status: 'upcoming'
  },
  // Sunday, 14 June 2026
  {
    id: '9',
    homeTeam: { id: 'ci', name: 'Ivory Coast', flag: '🇨🇮' },
    awayTeam: { id: 'ec', name: 'Ecuador', flag: '🇪🇨' },
    date: new Date('2026-06-14T19:00:00-04:00'),
    venue: 'Philadelphia',
    group: 'Group E',
    status: 'upcoming'
  },
  {
    id: '10',
    homeTeam: { id: 'de', name: 'Germany', flag: '🇩🇪' },
    awayTeam: { id: 'cw', name: 'Curaçao', flag: '🇨🇼' },
    date: new Date('2026-06-14T13:00:00-04:00'),
    venue: 'Houston',
    group: 'Group E',
    status: 'upcoming'
  },
  {
    id: '11',
    homeTeam: { id: 'nl', name: 'Netherlands', flag: '🇳🇱' },
    awayTeam: { id: 'jp', name: 'Japan', flag: '🇯🇵' },
    date: new Date('2026-06-14T16:00:00-04:00'),
    venue: 'Dallas',
    group: 'Group F',
    status: 'upcoming'
  },
  {
    id: '12',
    homeTeam: { id: 'se', name: 'Sweden', flag: '🇸🇪' },
    awayTeam: { id: 'tn', name: 'Tunisia', flag: '🇹🇳' },
    date: new Date('2026-06-14T22:00:00-04:00'),
    venue: 'Monterrey',
    group: 'Group F',
    status: 'upcoming'
  },
  // Monday, 15 June 2026
  {
    id: '13',
    homeTeam: { id: 'be', name: 'Belgium', flag: '🇧🇪' },
    awayTeam: { id: 'eg', name: 'Egypt', flag: '🇪🇬' },
    date: new Date('2026-06-15T15:00:00-04:00'),
    venue: 'Seattle',
    group: 'Group G',
    status: 'upcoming'
  },
  {
    id: '14',
    homeTeam: { id: 'ir', name: 'Iran', flag: '🇮🇷' },
    awayTeam: { id: 'nz', name: 'New Zealand', flag: '🇳🇿' },
    date: new Date('2026-06-15T21:00:00-04:00'),
    venue: 'Inglewood',
    group: 'Group G',
    status: 'upcoming'
  },
  {
    id: '15',
    homeTeam: { id: 'es', name: 'Spain', flag: '🇪🇸' },
    awayTeam: { id: 'cv', name: 'Cape Verde', flag: '🇨🇻' },
    date: new Date('2026-06-15T12:00:00-04:00'),
    venue: 'Atlanta',
    group: 'Group H',
    status: 'upcoming'
  },
  {
    id: '16',
    homeTeam: { id: 'sa', name: 'Saudi Arabia', flag: '🇸🇦' },
    awayTeam: { id: 'uy', name: 'Uruguay', flag: '🇺🇾' },
    date: new Date('2026-06-15T18:00:00-04:00'),
    venue: 'Miami',
    group: 'Group H',
    status: 'upcoming'
  },
  // Tuesday, 16 June 2026
  {
    id: '17',
    homeTeam: { id: 'fr', name: 'France', flag: '🇫🇷' },
    awayTeam: { id: 'sn', name: 'Senegal', flag: '🇸🇳' },
    date: new Date('2026-06-16T15:00:00-04:00'),
    venue: 'New York/New Jersey',
    group: 'Group I',
    status: 'upcoming'
  },
  {
    id: '18',
    homeTeam: { id: 'iq', name: 'Iraq', flag: '🇮🇶' },
    awayTeam: { id: 'no', name: 'Norway', flag: '🇳🇴' },
    date: new Date('2026-06-16T18:00:00-04:00'),
    venue: 'Boston',
    group: 'Group I',
    status: 'upcoming'
  },
  {
    id: '19',
    homeTeam: { id: 'ar', name: 'Argentina', flag: '🇦🇷' },
    awayTeam: { id: 'dz', name: 'Algeria', flag: '🇩🇿' },
    date: new Date('2026-06-16T21:00:00-04:00'),
    venue: 'Kansas City',
    group: 'Group J',
    status: 'upcoming'
  },
  {
    id: '20',
    homeTeam: { id: 'at', name: 'Austria', flag: '🇦🇹' },
    awayTeam: { id: 'jo', name: 'Jordan', flag: '🇯🇴' },
    date: new Date('2026-06-17T00:00:00-04:00'),
    venue: 'San Francisco Bay Area',
    group: 'Group J',
    status: 'upcoming'
  },
  // Wednesday, 17 June 2026
  {
    id: '21',
    homeTeam: { id: 'pt', name: 'Portugal', flag: '🇵🇹' },
    awayTeam: { id: 'cd', name: 'DR Congo', flag: '🇨🇩' },
    date: new Date('2026-06-17T13:00:00-04:00'),
    venue: 'Houston',
    group: 'Group K',
    status: 'upcoming'
  },
  {
    id: '22',
    homeTeam: { id: 'uz', name: 'Uzbekistan', flag: '��' },
    awayTeam: { id: 'co', name: 'Colombia', flag: '🇨🇴' },
    date: new Date('2026-06-17T22:00:00-04:00'),
    venue: 'Mexico City',
    group: 'Group K',
    status: 'upcoming'
  },
  {
    id: '23',
    homeTeam: { id: 'en', name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    awayTeam: { id: 'hr', name: 'Croatia', flag: '🇭🇷' },
    date: new Date('2026-06-17T16:00:00-04:00'),
    venue: 'Dallas',
    group: 'Group L',
    status: 'upcoming'
  },
  {
    id: '24',
    homeTeam: { id: 'gh', name: 'Ghana', flag: '🇬🇭' },
    awayTeam: { id: 'pa', name: 'Panama', flag: '🇵🇦' },
    date: new Date('2026-06-17T19:00:00-04:00'),
    venue: 'Toronto',
    group: 'Group L',
    status: 'upcoming'
  },
  // Thursday, 18 June 2026
  {
    id: '25',
    homeTeam: { id: 'cz', name: 'Czech Republic', flag: '🇨🇿' },
    awayTeam: { id: 'za', name: 'South Africa', flag: '🇿🇦' },
    date: new Date('2026-06-18T12:00:00-04:00'),
    venue: 'Atlanta',
    group: 'Group A',
    status: 'upcoming'
  },
  {
    id: '26',
    homeTeam: { id: 'ch', name: 'Switzerland', flag: '🇨🇭' },
    awayTeam: { id: 'ba', name: 'Bosnia & Herzegovina', flag: '🇧🇦' },
    date: new Date('2026-06-18T15:00:00-04:00'),
    venue: 'Los Angeles',
    group: 'Group A',
    status: 'upcoming'
  },
  {
    id: '27',
    homeTeam: { id: 'ca', name: 'Canada', flag: '🇨🇦' },
    awayTeam: { id: 'qa', name: 'Qatar', flag: '🇶🇦' },
    date: new Date('2026-06-18T18:00:00-04:00'),
    venue: 'Vancouver',
    group: 'Group B',
    status: 'upcoming'
  },
  {
    id: '28',
    homeTeam: { id: 'mx', name: 'Mexico', flag: '🇲🇽' },
    awayTeam: { id: 'kr', name: 'Korea Republic', flag: '🇰🇷' },
    date: new Date('2026-06-18T21:00:00-04:00'),
    venue: 'Guadalajara',
    group: 'Group A',
    status: 'upcoming'
  },
  // Friday, 19 June 2026
  {
    id: '29',
    homeTeam: { id: 'br', name: 'Brazil', flag: '🇧🇷' },
    awayTeam: { id: 'ht', name: 'Haiti', flag: '🇭🇹' },
    date: new Date('2026-06-19T20:30:00-04:00'),
    venue: 'Philadelphia',
    group: 'Group C',
    status: 'upcoming'
  },
  {
    id: '30',
    homeTeam: { id: 'gb-sct', name: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
    awayTeam: { id: 'ma', name: 'Morocco', flag: '🇲🇦' },
    date: new Date('2026-06-19T18:00:00-04:00'),
    venue: 'Boston',
    group: 'Group C',
    status: 'upcoming'
  },
  {
    id: '31',
    homeTeam: { id: 'tr', name: 'Turkey', flag: '🇹🇷' },
    awayTeam: { id: 'py', name: 'Paraguay', flag: '🇵🇾' },
    date: new Date('2026-06-19T23:00:00-04:00'),
    venue: 'San Francisco Bay Area',
    group: 'Group D',
    status: 'upcoming'
  },
  {
    id: '32',
    homeTeam: { id: 'us', name: 'USA', flag: '🇺🇸' },
    awayTeam: { id: 'au', name: 'Australia', flag: '🇦🇺' },
    date: new Date('2026-06-19T15:00:00-04:00'),
    venue: 'Seattle',
    group: 'Group D',
    status: 'upcoming'
  },
  // Saturday, 20 June 2026
  {
    id: '33',
    homeTeam: { id: 'de', name: 'Germany', flag: '🇩🇪' },
    awayTeam: { id: 'ci', name: 'Ivory Coast', flag: '🇨🇮' },
    date: new Date('2026-06-20T16:00:00-04:00'),
    venue: 'Toronto',
    group: 'Group E',
    status: 'upcoming'
  },
  {
    id: '34',
    homeTeam: { id: 'ec', name: 'Ecuador', flag: '🇪🇨' },
    awayTeam: { id: 'cw', name: 'Curaçao', flag: '🇨🇼' },
    date: new Date('2026-06-20T20:00:00-04:00'),
    venue: 'Kansas City',
    group: 'Group E',
    status: 'upcoming'
  },
  {
    id: '35',
    homeTeam: { id: 'nl', name: 'Netherlands', flag: '🇳🇱' },
    awayTeam: { id: 'se', name: 'Sweden', flag: '🇸🇪' },
    date: new Date('2026-06-20T13:00:00-04:00'),
    venue: 'Houston',
    group: 'Group F',
    status: 'upcoming'
  },
  {
    id: '36',
    homeTeam: { id: 'tn', name: 'Tunisia', flag: '🇹🇳' },
    awayTeam: { id: 'jp', name: 'Japan', flag: '🇯🇵' },
    date: new Date('2026-06-21T00:00:00-04:00'),
    venue: 'Monterrey',
    group: 'Group F',
    status: 'upcoming'
  },
  // Sunday, 21 June 2026
  {
    id: '37',
    homeTeam: { id: 'be', name: 'Belgium', flag: '🇧🇪' },
    awayTeam: { id: 'ir', name: 'Iran', flag: '🇮🇷' },
    date: new Date('2026-06-21T15:00:00-04:00'),
    venue: 'Inglewood',
    group: 'Group G',
    status: 'upcoming'
  },
  {
    id: '38',
    homeTeam: { id: 'nz', name: 'New Zealand', flag: '🇳🇿' },
    awayTeam: { id: 'eg', name: 'Egypt', flag: '🇪🇬' },
    date: new Date('2026-06-21T21:00:00-04:00'),
    venue: 'Vancouver',
    group: 'Group G',
    status: 'upcoming'
  },
  {
    id: '39',
    homeTeam: { id: 'es', name: 'Spain', flag: '🇪🇸' },
    awayTeam: { id: 'sa', name: 'Saudi Arabia', flag: '🇸🇦' },
    date: new Date('2026-06-21T12:00:00-04:00'),
    venue: 'Atlanta',
    group: 'Group H',
    status: 'upcoming'
  },
  {
    id: '40',
    homeTeam: { id: 'uy', name: 'Uruguay', flag: '🇺🇾' },
    awayTeam: { id: 'cv', name: 'Cape Verde', flag: '🇨🇻' },
    date: new Date('2026-06-21T18:00:00-04:00'),
    venue: 'Miami',
    group: 'Group H',
    status: 'upcoming'
  },
  // Monday, 22 June 2026
  {
    id: '41',
    homeTeam: { id: 'fr', name: 'France', flag: '🇫🇷' },
    awayTeam: { id: 'iq', name: 'Iraq', flag: '🇮🇶' },
    date: new Date('2026-06-22T17:00:00-04:00'),
    venue: 'Philadelphia',
    group: 'Group I',
    status: 'upcoming'
  },
  {
    id: '42',
    homeTeam: { id: 'sn', name: 'Senegal', flag: '🇸🇳' },
    awayTeam: { id: 'no', name: 'Norway', flag: '🇳🇴' },
    date: new Date('2026-06-22T20:00:00-04:00'),
    venue: 'New York/New Jersey',
    group: 'Group I',
    status: 'upcoming'
  },
  {
    id: '43',
    homeTeam: { id: 'ar', name: 'Argentina', flag: '🇦🇷' },
    awayTeam: { id: 'at', name: 'Austria', flag: '🇦🇹' },
    date: new Date('2026-06-22T13:00:00-04:00'),
    venue: 'Dallas',
    group: 'Group J',
    status: 'upcoming'
  },
  {
    id: '44',
    homeTeam: { id: 'jo', name: 'Jordan', flag: '🇯🇴' },
    awayTeam: { id: 'dz', name: 'Algeria', flag: '🇩🇿' },
    date: new Date('2026-06-22T23:00:00-04:00'),
    venue: 'San Francisco Bay Area',
    group: 'Group J',
    status: 'upcoming'
  },
  // Tuesday, 23 June 2026
  {
    id: '45',
    homeTeam: { id: 'pt', name: 'Portugal', flag: '🇵🇹' },
    awayTeam: { id: 'uz', name: 'Uzbekistan', flag: '🇺🇿' },
    date: new Date('2026-06-23T13:00:00-04:00'),
    venue: 'Houston',
    group: 'Group K',
    status: 'upcoming'
  },
  {
    id: '46',
    homeTeam: { id: 'co', name: 'Colombia', flag: '🇨🇴' },
    awayTeam: { id: 'cd', name: 'DR Congo', flag: '🇨🇩' },
    date: new Date('2026-06-23T22:00:00-04:00'),
    venue: 'Guadalajara',
    group: 'Group K',
    status: 'upcoming'
  },
  {
    id: '47',
    homeTeam: { id: 'en', name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    awayTeam: { id: 'gh', name: 'Ghana', flag: '🇬🇭' },
    date: new Date('2026-06-23T16:00:00-04:00'),
    venue: 'Boston',
    group: 'Group L',
    status: 'upcoming'
  },
  {
    id: '48',
    homeTeam: { id: 'pa', name: 'Panama', flag: '🇵🇦' },
    awayTeam: { id: 'hr', name: 'Croatia', flag: '🇭🇷' },
    date: new Date('2026-06-23T19:00:00-04:00'),
    venue: 'Toronto',
    group: 'Group L',
    status: 'upcoming'
  },
  // Wednesday, 24 June 2026
  {
    id: '49',
    homeTeam: { id: 'cz', name: 'Czech Republic', flag: '��' },
    awayTeam: { id: 'mx', name: 'Mexico', flag: '🇲🇽' },
    date: new Date('2026-06-24T21:00:00-04:00'),
    venue: 'Mexico City',
    group: 'Group A',
    status: 'upcoming'
  },
  {
    id: '50',
    homeTeam: { id: 'za', name: 'South Africa', flag: '��' },
    awayTeam: { id: 'kr', name: 'Korea Republic', flag: '🇰🇷' },
    date: new Date('2026-06-24T21:00:00-04:00'),
    venue: 'Monterrey',
    group: 'Group A',
    status: 'upcoming'
  },
  {
    id: '51',
    homeTeam: { id: 'ch', name: 'Switzerland', flag: '🇨🇭' },
    awayTeam: { id: 'ca', name: 'Canada', flag: '🇨🇦' },
    date: new Date('2026-06-24T15:00:00-04:00'),
    venue: 'Vancouver',
    group: 'Group B',
    status: 'upcoming'
  },
  {
    id: '52',
    homeTeam: { id: 'ba', name: 'Bosnia & Herzegovina', flag: '🇧🇦' },
    awayTeam: { id: 'qa', name: 'Qatar', flag: '🇶🇦' },
    date: new Date('2026-06-24T15:00:00-04:00'),
    venue: 'Seattle',
    group: 'Group B',
    status: 'upcoming'
  },
  {
    id: '105',
    homeTeam: { id: 'gb-sct', name: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
    awayTeam: { id: 'br', name: 'Brazil', flag: '🇧🇷' },
    date: new Date('2026-06-24T18:00:00-04:00'),
    venue: 'New York/New Jersey',
    group: 'Group C',
    status: 'upcoming'
  },
  {
    id: '106',
    homeTeam: { id: 'ma', name: 'Morocco', flag: '🇲🇦' },
    awayTeam: { id: 'ht', name: 'Haiti', flag: '🇭🇹' },
    date: new Date('2026-06-24T18:00:00-04:00'),
    venue: 'New York/New Jersey',
    group: 'Group C',
    status: 'upcoming'
  },
  {
    id: '53',
    homeTeam: { id: 'cw', name: 'Curaçao', flag: '🇨🇼' },
    awayTeam: { id: 'ci', name: 'Ivory Coast', flag: '🇨🇮' },
    date: new Date('2026-06-25T16:00:00-04:00'),
    venue: 'Philadelphia',
    group: 'Group E',
    status: 'upcoming'
  },
  {
    id: '54',
    homeTeam: { id: 'ec', name: 'Ecuador', flag: '🇪🇨' },
    awayTeam: { id: 'de', name: 'Germany', flag: '🇩🇪' },
    date: new Date('2026-06-25T16:00:00-04:00'),
    venue: 'New York/New Jersey',
    group: 'Group E',
    status: 'upcoming'
  },
  // Thursday, 25 June 2026
  {
    id: '55',
    homeTeam: { id: 'jp', name: 'Japan', flag: '🇯🇵' },
    awayTeam: { id: 'se', name: 'Sweden', flag: '🇸🇪' },
    date: new Date('2026-06-25T19:00:00-04:00'),
    venue: 'Dallas',
    group: 'Group F',
    status: 'upcoming'
  },
  {
    id: '56',
    homeTeam: { id: 'tn', name: 'Tunisia', flag: '🇹🇳' },
    awayTeam: { id: 'nl', name: 'Netherlands', flag: '🇳🇱' },
    date: new Date('2026-06-25T19:00:00-04:00'),
    venue: 'Kansas City',
    group: 'Group F',
    status: 'upcoming'
  },
  {
    id: '57',
    homeTeam: { id: 'eg', name: 'Egypt', flag: '🇪🇬' },
    awayTeam: { id: 'ir', name: 'Iran', flag: '🇮🇷' },
    date: new Date('2026-06-26T23:00:00-04:00'),
    venue: 'Seattle',
    group: 'Group G',
    status: 'upcoming'
  },
  {
    id: '58',
    homeTeam: { id: 'nz', name: 'New Zealand', flag: '🇳🇿' },
    awayTeam: { id: 'be', name: 'Belgium', flag: '🇧🇪' },
    date: new Date('2026-06-26T23:00:00-04:00'),
    venue: 'Vancouver',
    group: 'Group G',
    status: 'upcoming'
  },
  {
    id: '107',
    homeTeam: { id: 'tr', name: 'Turkey', flag: '🇹🇷' },
    awayTeam: { id: 'us', name: 'USA', flag: '🇺🇸' },
    date: new Date('2026-06-25T22:00:00-04:00'),
    venue: 'New York/New Jersey',
    group: 'Group D',
    status: 'upcoming'
  },
  {
    id: '108',
    homeTeam: { id: 'py', name: 'Paraguay', flag: '🇵🇾' },
    awayTeam: { id: 'au', name: 'Australia', flag: '🇦🇺' },
    date: new Date('2026-06-25T22:00:00-04:00'),
    venue: 'New York/New Jersey',
    group: 'Group D',
    status: 'upcoming'
  },
  {
    id: '59',
    homeTeam: { id: 'cv', name: 'Cape Verde', flag: '🇨🇻' },
    awayTeam: { id: 'sa', name: 'Saudi Arabia', flag: '��' },
    date: new Date('2026-06-26T20:00:00-04:00'),
    venue: 'Houston',
    group: 'Group H',
    status: 'upcoming'
  },
  {
    id: '60',
    homeTeam: { id: 'uy', name: 'Uruguay', flag: '🇺🇾' },
    awayTeam: { id: 'es', name: 'Spain', flag: '🇪🇸' },
    date: new Date('2026-06-26T20:00:00-04:00'),
    venue: 'Guadalajara',
    group: 'Group H',
    status: 'upcoming'
  },
  // Friday, 26 June 2026
  {
    id: '61',
    homeTeam: { id: 'no', name: 'Norway', flag: '🇳🇴' },
    awayTeam: { id: 'fr', name: 'France', flag: '🇫🇷' },
    date: new Date('2026-06-26T15:00:00-04:00'),
    venue: 'Boston',
    group: 'Group I',
    status: 'upcoming'
  },
  {
    id: '62',
    homeTeam: { id: 'iq', name: 'Iraq', flag: '🇮🇶' },
    awayTeam: { id: 'sn', name: 'Senegal', flag: '🇸🇳' },
    date: new Date('2026-06-26T15:00:00-04:00'),
    venue: 'Toronto',
    group: 'Group I',
    status: 'upcoming'
  },
  {
    id: '63',
    homeTeam: { id: 'dz', name: 'Algeria', flag: '🇩🇿' },
    awayTeam: { id: 'at', name: 'Austria', flag: '🇦🇹' },
    date: new Date('2026-06-27T22:00:00-04:00'),
    venue: 'Kansas City',
    group: 'Group J',
    status: 'upcoming'
  },
  {
    id: '64',
    homeTeam: { id: 'jo', name: 'Jordan', flag: '🇯🇴' },
    awayTeam: { id: 'ar', name: 'Argentina', flag: '🇦🇷' },
    date: new Date('2026-06-27T22:00:00-04:00'),
    venue: 'Dallas',
    group: 'Group J',
    status: 'upcoming'
  },
  {
    id: '65',
    homeTeam: { id: 'co', name: 'Colombia', flag: '🇨🇴' },
    awayTeam: { id: 'pt', name: 'Portugal', flag: '🇵🇹' },
    date: new Date('2026-06-27T19:30:00-04:00'),
    venue: 'Miami',
    group: 'Group K',
    status: 'upcoming'
  },
  {
    id: '66',
    homeTeam: { id: 'cd', name: 'DR Congo', flag: '🇨🇩' },
    awayTeam: { id: 'uz', name: 'Uzbekistan', flag: '🇺🇿' },
    date: new Date('2026-06-27T19:30:00-04:00'),
    venue: 'Atlanta',
    group: 'Group K',
    status: 'upcoming'
  },
  // Saturday, 27 June 2026
  {
    id: '67',
    homeTeam: { id: 'pa', name: 'Panama', flag: '🇵🇦' },
    awayTeam: { id: 'en', name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    date: new Date('2026-06-27T17:00:00-04:00'),
    venue: 'New York/New Jersey',
    group: 'Group L',
    status: 'upcoming'
  },
  {
    id: '68',
    homeTeam: { id: 'hr', name: 'Croatia', flag: '🇭🇷' },
    awayTeam: { id: 'gh', name: 'Ghana', flag: '🇬🇭' },
    date: new Date('2026-06-27T17:00:00-04:00'),
    venue: 'Philadelphia',
    group: 'Group L',
    status: 'upcoming'
  },
  // Round of 32
  {
    id: '73',
    homeTeam: { id: 'tba', name: 'Group A runners-up', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Group B runners-up', flag: '🏆' },
    date: new Date('2026-06-28T15:00:00-04:00'),
    venue: 'Inglewood',
    group: 'Round of 32',
    status: 'upcoming'
  },
  {
    id: '74',
    homeTeam: { id: 'tba', name: 'Group E winners', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Group A/B/C/D/F third place', flag: '🏆' },
    date: new Date('2026-06-29T16:30:00-04:00'),
    venue: 'Boston',
    group: 'Round of 32',
    status: 'upcoming'
  },
  {
    id: '75',
    homeTeam: { id: 'tba', name: 'Group F winners', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Group C runners-up', flag: '🏆' },
    date: new Date('2026-06-29T21:00:00-04:00'),
    venue: 'Guadalupe',
    group: 'Round of 32',
    status: 'upcoming'
  },
  {
    id: '76',
    homeTeam: { id: 'tba', name: 'Group C winners', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Group F runners-up', flag: '🏆' },
    date: new Date('2026-06-30T13:00:00-04:00'),
    venue: 'Houston',
    group: 'Round of 32',
    status: 'upcoming'
  },
  {
    id: '77',
    homeTeam: { id: 'tba', name: 'Group I winners', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Group C/D/F/G/H third place', flag: '🏆' },
    date: new Date('2026-06-30T17:00:00-04:00'),
    venue: 'New Jersey',
    group: 'Round of 32',
    status: 'upcoming'
  },
  {
    id: '78',
    homeTeam: { id: 'tba', name: 'Group E runners-up', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Group I runners-up', flag: '🏆' },
    date: new Date('2026-06-30T13:00:00-04:00'),
    venue: 'Dallas',
    group: 'Round of 32',
    status: 'upcoming'
  },
  {
    id: '79',
    homeTeam: { id: 'tba', name: 'Group A winners', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Group C/E/F/H/I third place', flag: '🏆' },
    date: new Date('2026-06-30T21:00:00-04:00'),
    venue: 'Mexico City',
    group: 'Round of 32',
    status: 'upcoming'
  },
  {
    id: '80',
    homeTeam: { id: 'tba', name: 'Group L winners', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Group E/H/I/J/K third place', flag: '🏆' },
    date: new Date('2026-07-01T12:00:00-04:00'),
    venue: 'Atlanta',
    group: 'Round of 32',
    status: 'upcoming'
  },
  {
    id: '81',
    homeTeam: { id: 'tba', name: 'Group D winners', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Group B/E/F/I/J third place', flag: '🏆' },
    date: new Date('2026-07-01T20:00:00-04:00'),
    venue: 'San Francisco Bay Area',
    group: 'Round of 32',
    status: 'upcoming'
  },
  {
    id: '82',
    homeTeam: { id: 'tba', name: 'Group G winners', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Group A/E/H/I/J third place', flag: '🏆' },
    date: new Date('2026-07-02T16:00:00-04:00'),
    venue: 'Seattle',
    group: 'Round of 32',
    status: 'upcoming'
  },
  {
    id: '83',
    homeTeam: { id: 'tba', name: 'Group K runners-up', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Group L runners-up', flag: '🏆' },
    date: new Date('2026-07-02T19:00:00-04:00'),
    venue: 'Toronto',
    group: 'Round of 32',
    status: 'upcoming'
  },
  {
    id: '84',
    homeTeam: { id: 'tba', name: 'Group H winners', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Group J runners-up', flag: '🏆' },
    date: new Date('2026-07-02T15:00:00-04:00'),
    venue: 'Los Angeles',
    group: 'Round of 32',
    status: 'upcoming'
  },
  {
    id: '85',
    homeTeam: { id: 'tba', name: 'Group B winners', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Group E/F/G/I/J third place', flag: '🏆' },
    date: new Date('2026-07-02T23:00:00-04:00'),
    venue: 'Vancouver',
    group: 'Round of 32',
    status: 'upcoming'
  },
  {
    id: '86',
    homeTeam: { id: 'tba', name: 'Group J winners', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Group H runners-up', flag: '🏆' },
    date: new Date('2026-07-03T18:00:00-04:00'),
    venue: 'Miami',
    group: 'Round of 32',
    status: 'upcoming'
  },
  {
    id: '87',
    homeTeam: { id: 'tba', name: 'Group K winners', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Group D/E/I/J/L third place', flag: '🏆' },
    date: new Date('2026-07-03T21:30:00-04:00'),
    venue: 'Kansas City',
    group: 'Round of 32',
    status: 'upcoming'
  },
  {
    id: '88',
    homeTeam: { id: 'tba', name: 'Group D runners-up', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Group G runners-up', flag: '🏆' },
    date: new Date('2026-07-03T14:00:00-04:00'),
    venue: 'Dallas',
    group: 'Round of 32',
    status: 'upcoming'
  },
  // Round of 16
  {
    id: '89',
    homeTeam: { id: 'tba', name: 'Winner match 74', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Winner match 77', flag: '🏆' },
    date: new Date('2026-07-04T17:00:00-04:00'),
    venue: 'Philadelphia',
    group: 'Round of 16',
    status: 'upcoming'
  },
  {
    id: '90',
    homeTeam: { id: 'tba', name: 'Winner match 73', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Winner match 75', flag: '🏆' },
    date: new Date('2026-07-04T13:00:00-04:00'),
    venue: 'Houston',
    group: 'Round of 16',
    status: 'upcoming'
  },
  {
    id: '91',
    homeTeam: { id: 'tba', name: 'Winner match 76', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Winner match 78', flag: '🏆' },
    date: new Date('2026-07-05T16:00:00-04:00'),
    venue: 'New Jersey',
    group: 'Round of 16',
    status: 'upcoming'
  },
  {
    id: '92',
    homeTeam: { id: 'tba', name: 'Winner match 79', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Winner match 80', flag: '🏆' },
    date: new Date('2026-07-05T20:00:00-04:00'),
    venue: 'Mexico City',
    group: 'Round of 16',
    status: 'upcoming'
  },
  {
    id: '93',
    homeTeam: { id: 'tba', name: 'Winner match 83', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Winner match 84', flag: '🏆' },
    date: new Date('2026-07-06T15:00:00-04:00'),
    venue: 'Dallas',
    group: 'Round of 16',
    status: 'upcoming'
  },
  {
    id: '94',
    homeTeam: { id: 'tba', name: 'Winner match 81', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Winner match 82', flag: '🏆' },
    date: new Date('2026-07-06T20:00:00-04:00'),
    venue: 'Seattle',
    group: 'Round of 16',
    status: 'upcoming'
  },
  {
    id: '95',
    homeTeam: { id: 'tba', name: 'Winner match 86', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Winner match 88', flag: '🏆' },
    date: new Date('2026-07-07T12:00:00-04:00'),
    venue: 'Atlanta',
    group: 'Round of 16',
    status: 'upcoming'
  },
  {
    id: '96',
    homeTeam: { id: 'tba', name: 'Winner match 85', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Winner match 87', flag: '🏆' },
    date: new Date('2026-07-07T16:00:00-04:00'),
    venue: 'Vancouver',
    group: 'Round of 16',
    status: 'upcoming'
  },
  // Quarter Finals
  {
    id: '97',
    homeTeam: { id: 'tba', name: 'Winner match 89', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Winner match 90', flag: '🏆' },
    date: new Date('2026-07-09T16:00:00-04:00'),
    venue: 'Boston',
    group: 'Quarter Final',
    status: 'upcoming'
  },
  {
    id: '98',
    homeTeam: { id: 'tba', name: 'Winner match 93', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Winner match 94', flag: '🏆' },
    date: new Date('2026-07-10T15:00:00-04:00'),
    venue: 'Los Angeles',
    group: 'Quarter Final',
    status: 'upcoming'
  },
  {
    id: '99',
    homeTeam: { id: 'tba', name: 'Winner match 91', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Winner match 92', flag: '🏆' },
    date: new Date('2026-07-11T17:00:00-04:00'),
    venue: 'Miami',
    group: 'Quarter Final',
    status: 'upcoming'
  },
  {
    id: '100',
    homeTeam: { id: 'tba', name: 'Winner match 95', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Winner match 96', flag: '🏆' },
    date: new Date('2026-07-11T21:00:00-04:00'),
    venue: 'Kansas City',
    group: 'Quarter Final',
    status: 'upcoming'
  },
  // Semi Finals
  {
    id: '101',
    homeTeam: { id: 'tba', name: 'Winner match 97', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Winner match 98', flag: '🏆' },
    date: new Date('2026-07-14T15:00:00-04:00'),
    venue: 'Dallas',
    group: 'Semi Final',
    status: 'upcoming'
  },
  {
    id: '102',
    homeTeam: { id: 'tba', name: 'Winner match 99', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Winner match 100', flag: '🏆' },
    date: new Date('2026-07-15T15:00:00-04:00'),
    venue: 'Atlanta',
    group: 'Semi Final',
    status: 'upcoming'
  },
  // Bronze Medal Game
  {
    id: '103',
    homeTeam: { id: 'tba', name: 'Runner-up match 101', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Runner-up match 102', flag: '🏆' },
    date: new Date('2026-07-18T17:00:00-04:00'),
    venue: 'Miami',
    group: 'Bronze Medal',
    status: 'upcoming'
  },
  // Final
  {
    id: '104',
    homeTeam: { id: 'tba', name: 'Winner match 101', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Winner match 102', flag: '🏆' },
    date: new Date('2026-07-19T15:00:00-04:00'),
    venue: 'New Jersey',
    group: 'Final',
    status: 'upcoming'
  }
]

interface FifaWorldCupProps {
  currentPlayer: Player
  allPlayers: Player[]
  predictions: Map<string, any>
  onPlaceBet: (teamId: string, teamName: string) => void
  onPrediction: (gameId: string, prediction: string, wager?: number) => Promise<void>
}

export default function FifaWorldCup({ currentPlayer, allPlayers, predictions, onPlaceBet, onPrediction }: FifaWorldCupProps) {
  // Add defensive checks
  if (!currentPlayer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-950 via-blue-950 to-red-950 flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Loading...</h2>
          <p className="text-gray-400">Please wait while we set up your experience</p>
        </div>
      </div>
    )
  }

  const [games] = useState<Game[]>(sampleGames)
  const currentDate = new Date()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [userPoints, setUserPoints] = useState(0)
  const [showRules, setShowRules] = useState(false)
  const [wagerAmount, setWagerAmount] = useState<Map<string, number>>(new Map())
  const [showLeaderboard, setShowLeaderboard] = useState(true)

  const getFlagCode = (id: string): string => {
  switch (id) {
    case 'en':
      return 'gb-eng'
    default:
      return id
  }
}
  // Inject mobile styles
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = mobileStyles
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  // Calculate leaderboard from all players
  const leaderboard = allPlayers
    .map(player => ({ username: player.username, points: player.points }))
    .sort((a, b) => b.points - a.points)

  // Check if a game is available for prediction
  const isGameAvailableForPrediction = (game: Game): boolean => {
    const now = currentDate
    const gameDate = game.date
    
    // Predictions don't open until June 10, 2026 at 12:00 AM EST
    const tournamentStart = new Date('2026-06-10T00:00:00')
    if (now < tournamentStart) {
      return false
    }
    
    // Group stage games: open immediately until kickoff
    if (game.group && game.group.startsWith('Group')) {
      return now < gameDate && game.status === 'upcoming'
    }
    
    // Knockout stage games: day before rule
    const predictionOpenDate = new Date(gameDate)
    predictionOpenDate.setDate(predictionOpenDate.getDate() - 1)
    predictionOpenDate.setHours(0, 0, 0, 0)
    
    // Available from day before at 00:00 until game kickoff
    return now >= predictionOpenDate && now < gameDate && game.status === 'upcoming'
  }

  // Check if predictions are open for a specific date
  const getAvailableGamesForDate = (date: Date): Game[] => {
    return games
      .filter(game => {
        const gameDate = new Date(game.date)
        gameDate.setHours(0, 0, 0, 0)
        
        const checkDate = new Date(date)
        checkDate.setHours(0, 0, 0, 0)
        
        // Show games on the selected date
        return gameDate.getTime() === checkDate.getTime()
      })
      .sort((a, b) => a.date.getTime() - b.date.getTime())
  }

  // Calculate points based on prediction and actual result
  const calculatePoints = (prediction: PredictionType, actualResult: PredictionType): number => {
    if (actualResult === 'tie') {
      // Everyone gets 1 point for a tie
      // But if you predicted tie, you get 4 points
      return prediction === 'tie' ? 4 : 1
    }
    
    if (prediction === actualResult) {
      // Correct prediction: 3 points
      return 3
    }
    
    // Wrong prediction: 0 points
    return 0
  }

  // Check if a game is a knockout round
  const isKnockoutRound = (game: Game): boolean => {
    return !game.group.startsWith('Group')
  }

  // Handle prediction submission
  const handlePrediction = (gameId: string, prediction: PredictionType) => {
    const game = games.find(g => g.id === gameId)
    if (!game) return

    const wager = isKnockoutRound(game) ? wagerAmount.get(gameId) || 0 : 0

    // Send prediction to server for persistence and sync
    onPrediction(gameId, prediction, wager)

    // Calculate points if game has result
    if (game.actualResult) {
      const points = calculatePoints(prediction, game.actualResult)

      // Handle wager for knockout rounds
      if (wager > 0) {
        if (prediction === game.actualResult) {
          // Correct prediction: gain wagered points
          setUserPoints(prev => prev + points + wager)
        } else {
          // Incorrect prediction: lose wagered points
          setUserPoints(prev => prev + points - wager)
        }
      } else {
        setUserPoints(prev => prev + points)
      }
    }
  }

  // Format date for display
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  // Format time for display
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      timeZone: 'America/New_York'
    }) + ' ET'
  }

  // Get games for selected date
  const gamesForSelectedDate = getAvailableGamesForDate(selectedDate)

  // Get all games grouped by date
  const gamesByDate = games.reduce((acc, game) => {
    const dateKey = game.date.toDateString()
    if (!acc[dateKey]) {
      acc[dateKey] = []
    }
    acc[dateKey].push(game)
    return acc
  }, {} as Record<string, Game[]>)

  // Sort games within each date by kickoff time
  Object.keys(gamesByDate).forEach(dateKey => {
    gamesByDate[dateKey].sort((a, b) => a.date.getTime() - b.date.getTime())
  })

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-900 via-blue-900 to-red-950">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-950 via-blue-950 to-red-950 backdrop-blur-lg border-b border-yellow-500/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Official FIFA World Cup 2026 Logo */}
              <div className="relative">
                <img 
                  src="https://www.fifplay.com/wp-content/uploads/2023/05/FIFA-World-Cup-2026-logo.png" 
                  alt="FIFA World Cup 2026 Logo"
                  className="w-16 h-16 object-contain"
                  onError={(e) => {
                    // Fallback to trophy SVG if image fails to load
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.nextElementSibling?.classList.remove('hidden')
                  }}
                />
                <svg className="w-16 h-16 hidden" viewBox="0 0 100 100">
                  {/* World Cup Trophy Base */}
                  <ellipse cx="50" cy="85" rx="25" ry="8" fill="#8B7355" />
                  <rect x="40" y="70" width="20" height="15" fill="#D4AF37" />
                  {/* Trophy Body */}
                  <path d="M35 70 L30 40 L70 40 L65 70 Z" fill="#D4AF37" />
                  {/* Trophy Top */}
                  <circle cx="50" cy="35" r="15" fill="#FFD700" />
                  {/* Globe Lines */}
                  <ellipse cx="50" cy="35" rx="15" ry="8" fill="none" stroke="#1E3A5F" strokeWidth="1" />
                  <line x1="50" y1="20" x2="50" y2="50" stroke="#1E3A5F" strokeWidth="1" />
                  {/* Stars */}
                  <circle cx="42" cy="30" r="2" fill="#FFFFFF" />
                  <circle cx="58" cy="30" r="2" fill="#FFFFFF" />
                  <circle cx="50" cy="42" r="2" fill="#FFFFFF" />
                </svg>
                <div className="absolute -bottom-1 -right-1 bg-yellow-500 text-blue-900 text-xs font-bold px-2 py-0.5 rounded-full">
                  2026
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400">
                  FIFA World Cup 2026
                </h1>
                <p className="text-sm text-blue-300 font-medium">World Cup Prediction Challenge</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/50 rounded-lg px-4 py-2">
                <span className="text-sm text-yellow-200">Your Points:</span>
                <span className="text-2xl font-bold text-yellow-400">{currentPlayer.points}</span>
              </div>
              <button
                onClick={() => setShowRules(!showRules)}
                className="bg-gradient-to-r from-green-500 via-blue-500 to-red-500 hover:from-green-400 hover:via-blue-400 hover:to-red-400 text-white px-4 py-2 rounded-lg font-bold transition-all shadow-lg"
              >
                {showRules ? 'Hide Rules' : 'Show Rules'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Rules Modal */}
      {showRules && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-green-950 via-blue-950 to-red-950 rounded-2xl p-8 max-w-2xl w-full border border-yellow-500/30 shadow-2xl shadow-yellow-500/20">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-red-400 mb-6">📋 Scoring Rules</h2>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/40 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-400 mb-2">🏆 Win Prediction</h3>
                <p className="text-gray-200">If you pick a team to win and they win: <span className="text-yellow-400 font-bold">3 points</span></p>
              </div>
              <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/40 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">🤝 Tie Game</h3>
                <p className="text-gray-200">If the game ends in a tie: <span className="text-yellow-400 font-bold">everyone gets 1 point</span></p>
              </div>
              <div className="bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/40 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-red-400 mb-2">🎯 Tie Prediction Bonus</h3>
                <p className="text-gray-200">If you specifically predict a tie and it's a tie: <span className="text-yellow-400 font-bold">4 points</span> (rare!)</p>
              </div>
              <div className="bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/40 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-red-400 mb-2">❌ Wrong Prediction</h3>
                <p className="text-gray-200">If the team you chose loses: <span className="text-yellow-400 font-bold">0 points</span></p>
              </div>
              <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/40 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-400 mb-2">⏰ Timing Rules</h3>
                <p className="text-gray-200">You can predict games the <span className="text-white font-bold">day before</span> they play, up until the game starts. For example, games on June 11 can be predicted on June 10.</p>
              </div>
              <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/40 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">💰 Betting (Knockout Rounds Only)</h3>
                <p className="text-gray-200">In knockout rounds (Round of 32, 16, 8, 4, Semi Finals, Bronze Medal, Final), you can <span className="text-white font-bold">wager points</span> on your prediction. If correct, you gain the wagered points. If incorrect, you lose the wagered points.</p>
                <p className="text-gray-300 text-sm mt-2">Example: With 42 points, wager 7 points. Correct → 49 points. Wrong → 35 points.</p>
              </div>
            </div>
            <button
              onClick={() => setShowRules(false)}
              className="mt-6 w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-blue-900 py-3 rounded-lg font-bold transition-all shadow-lg shadow-yellow-500/30"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Betting Panel */}
        <div className="bg-gradient-to-br from-purple-950/80 via-blue-950/80 to-red-950/80 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-purple-500/30 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-4">🎰 Predict the Winner</h2>
          <p className="text-gray-400 mb-4">Select the team you think will win the entire tournament. If correct, you'll get <span className="text-green-400 font-semibold">+20 bonus points</span>!</p>
          {!currentPlayer.betTeamName ? (
            <select
              onChange={(e) => {
                const team = WORLD_CUP_TEAMS.find(t => t.id === e.target.value)
                if (team) {
                  onPlaceBet(team.id, team.name)
                }
              }}
              className="w-full bg-gray-800 border-2 border-gray-700 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
            >
              <option value="">Select a team...</option>
              {WORLD_CUP_TEAMS.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          ) : (
            <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
              <p className="text-green-400 font-semibold">Your Bet: {currentPlayer.betTeamName} (+20 if wins)</p>
            </div>
          )}
        </div>

        {/* Leaderboard Panel */}
        <div className="bg-gradient-to-br from-green-950/80 via-blue-950/80 to-red-950/80 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-yellow-500/30 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">🏆 Leaderboard</h2>
            <button
              onClick={() => setShowLeaderboard(!showLeaderboard)}
              className="text-gray-400 hover:text-white text-sm"
            >
              {showLeaderboard ? 'Hide' : 'Show'}
            </button>
          </div>
          {showLeaderboard && (
            <div className="space-y-2">
              {leaderboard.map((player, index) => (
                <div
                  key={player.username}
                  className={`leaderboard-row flex items-center justify-between bg-gray-800/50 rounded-xl p-4 border-2 ${
                    player.username === currentPlayer.username
                      ? 'border-yellow-500/50'
                      : 'border-gray-700/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-2xl font-bold ${
                      index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-300' : index === 2 ? 'text-orange-400' : 'text-gray-500'
                    }`}>
                      #{index + 1}
                    </span>
                    <span className={`text-lg font-semibold ${
                      player.username === currentPlayer.username ? 'text-yellow-400' : 'text-white'
                    }`}>
                      {player.username}
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-green-400">{player.points} pts</span>
                </div>
              ))}
            </div>
          )}
        </div>

            {/* Current Date Display */}
            <div className="bg-gradient-to-br from-green-950/80 via-blue-950/80 to-red-950/80 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-yellow-500/30 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg text-blue-300 mb-1">Opens on</h2>
              <p className="text-3xl font-bold text-white">{formatDate(new Date(selectedDate.getTime() - 86400000))}</p>
              <p className="text-sm text-gray-400">at 12:00 AM EST</p>
            </div>
            <div className="text-right">
              <h2 className="text-lg text-blue-300 mb-1">Games on</h2>
              <p className="text-3xl font-bold text-white">{formatDate(selectedDate)}</p>
            </div>
          </div>
          
          {/* Date Navigation */}
          <div className="mt-6 flex gap-2 flex-wrap">
            {Object.keys(gamesByDate).map((dateStr) => {
              const date = new Date(dateStr)
              
              const isSelected = selectedDate.toDateString() === date.toDateString()
              
              return (
                <button
                  key={dateStr}
                  onClick={() => setSelectedDate(date)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-green-500 via-blue-500 to-red-500 text-white shadow-lg'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700'
                  }`}
                >
                  {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </button>
              )
            })}
          </div>
        </div>

        {/* Available Games for Prediction */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Games Available for Prediction
            <span className="text-yellow-400 ml-2">({gamesForSelectedDate.length})</span>
          </h2>
          
          {gamesForSelectedDate.length === 0 ? (
            <div className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 rounded-2xl p-12 text-center border border-gray-700">
              <p className="text-gray-400 text-lg">No games available for prediction on this date.</p>
              <p className="text-gray-500 mt-2">Select a different date to see available games.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {gamesForSelectedDate.map((game) => {
                const existingPrediction = predictions.get(game.id)
                const isAvailable = isGameAvailableForPrediction(game)
                
                return (
                  <div
                    key={game.id}
                    className={`match-card bg-gradient-to-br from-green-950/80 via-blue-950/80 to-red-950/80 backdrop-blur-lg rounded-2xl p-6 border-2 transition-all shadow-xl ${
                      existingPrediction ? 'border-yellow-500/50 shadow-yellow-500/20' : 'border-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-yellow-300 font-bold font-mono">Game ID: {game.id.padStart(2, '0')}</span>
                        <span className="text-sm text-blue-300">{game.venue}</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          game.group.startsWith('Group') ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {game.group}
                        </span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        isAvailable ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {isAvailable ? 'Open for Prediction' : 'Closed'}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-center flex-1">
                        <img 
                          src={`https://flagcdn.com/w80/${getFlagCode(game.homeTeam.id)}.png`} 
                          alt={game.homeTeam.name}
                          className="w-16 h-12 object-cover rounded-lg mx-auto mb-2 shadow-lg"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                            e.currentTarget.nextElementSibling?.classList.remove('hidden')
                          }}
                        />
                        <span className="text-4xl hidden">{game.homeTeam.flag}</span>
                        <p className="text-white font-bold text-lg">{game.homeTeam.name}</p>
                      </div>
                      
                      <div className="text-center px-4">
                        <p className="text-blue-300 text-sm mb-1">{formatDate(game.date)}</p>
                        <p className="text-yellow-400 font-bold text-xl">{formatTime(game.date)}</p>
                      </div>
                      
                      <div className="text-center flex-1">
                        <img 
                          src={`https://flagcdn.com/w80/${getFlagCode(game.awayTeam.id)}.png`}
                          alt={game.awayTeam.name}
                          className="w-16 h-12 object-cover rounded-lg mx-auto mb-2 shadow-lg"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                            e.currentTarget.nextElementSibling?.classList.remove('hidden')
                          }}
                        />
                        <span className="text-4xl hidden">{game.awayTeam.flag}</span>
                        <p className="text-white font-bold text-lg">{game.awayTeam.name}</p>
                      </div>
                    </div>
                    
                    {existingPrediction ? (
                      <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/40 rounded-lg p-4 text-center">
                        <p className="text-yellow-400 font-semibold mb-1">✓ Prediction Submitted</p>
                        <p className="text-white">
                          You predicted: <span className="font-bold">
                            {existingPrediction.prediction === 'home' ? game.homeTeam.name :
                             existingPrediction.prediction === 'away' ? game.awayTeam.name :
                             'Tie'}
                          </span>
                        </p>
                        {existingPrediction.wager && (
                          <p className="text-yellow-400 text-sm mt-2">
                            💰 Wager: {existingPrediction.wager} pts
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {/* Betting Interface for Knockout Rounds */}
                        {isKnockoutRound(game) && (
                          <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/40 rounded-lg p-3 mb-3">
                            <p className="text-yellow-400 font-semibold text-sm mb-2">💰 Bet Your Points (Knockout Round)</p>
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                min="0"
                                max={userPoints}
                                value={wagerAmount.get(game.id) || 0}
                                onChange={(e) => {
                                  const value = parseInt(e.target.value) || 0
                                  const newWagers = new Map(wagerAmount)
                                  newWagers.set(game.id, Math.min(Math.max(0, value), userPoints))
                                  setWagerAmount(newWagers)
                                }}
                                placeholder="Enter wager"
                                className="flex-1 bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-500"
                                disabled={!isAvailable}
                              />
                              <span className="text-gray-400 text-sm">/ {userPoints} pts</span>
                            </div>
                            <p className="text-gray-400 text-xs mt-1">Correct: +{wagerAmount.get(game.id) || 0} pts | Wrong: -{wagerAmount.get(game.id) || 0} pts</p>
                          </div>
                        )}
                        
                        <p className="text-sm text-blue-300 text-center mb-3">Make your prediction:</p>
                        <div className="grid grid-cols-3 gap-2">
                          <button
                            onClick={() => handlePrediction(game.id, 'home')}
                            disabled={!isAvailable}
                            className={`py-3 rounded-lg font-medium transition-all ${
                              isAvailable
                                ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg shadow-green-500/30'
                                : 'bg-gray-800/50 text-gray-500 cursor-not-allowed border border-gray-700'
                            }`}
                          >
                            {game.homeTeam.flag} {game.homeTeam.name}
                          </button>
                          <button
                            onClick={() => handlePrediction(game.id, 'tie')}
                            disabled={!isAvailable}
                            className={`py-3 rounded-lg font-medium transition-all ${
                              isAvailable
                                ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/30'
                                : 'bg-gray-800/50 text-gray-500 cursor-not-allowed border border-gray-700'
                            }`}
                          >
                            ⚽ Tie
                          </button>
                          <button
                            onClick={() => handlePrediction(game.id, 'away')}
                            disabled={!isAvailable}
                            className={`py-3 rounded-lg font-medium transition-all ${
                              isAvailable
                                ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-500/30'
                                : 'bg-gray-800/50 text-gray-500 cursor-not-allowed border border-gray-700'
                            }`}
                          >
                            {game.awayTeam.flag} {game.awayTeam.name}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* All Games Schedule */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Complete Tournament Schedule</h2>
          <div className="space-y-4">
            {Object.entries(gamesByDate).map(([dateStr, dayGames]) => (
              <div key={dateStr} className="bg-gradient-to-br from-green-950/50 via-blue-950/50 to-red-950/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-yellow-400 mb-4">
                  {formatDate(new Date(dateStr))}
                </h3>
                <div className="space-y-3">
                  {dayGames.map((game) => {
                    const existingPrediction = predictions.get(game.id)
                    const isAvailable = isGameAvailableForPrediction(game)
                    
                    return (
                      <div
                        key={game.id}
                        className={`schedule-row bg-gradient-to-r from-green-950/80 via-blue-950/80 to-red-950/80 rounded-xl p-4 border transition-all ${
                          existingPrediction ? 'border-yellow-500/50' : 'border-gray-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-yellow-300 font-bold font-mono">Game ID: {game.id.padStart(2, '0')}</span>
                            <img 
                              src={`https://flagcdn.com/w40/${getFlagCode(game.homeTeam.id)}.png`}
                              alt={game.homeTeam.name}
                              className="w-8 h-6 object-cover rounded shadow"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none'
                                e.currentTarget.nextElementSibling?.classList.remove('hidden')
                              }}
                            />
                            <span className="text-2xl hidden">{game.homeTeam.flag}</span>
                            <span className="text-white font-bold">{game.homeTeam.name}</span>
                            <span className="text-yellow-400 font-bold px-2">vs</span>
                            <span className="text-white font-bold">{game.awayTeam.name}</span>
                            <img 
                              src={`https://flagcdn.com/w40/${getFlagCode(game.awayTeam.id)}.png`}
                              alt={game.awayTeam.name}
                              className="w-8 h-6 object-cover rounded shadow"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none'
                                e.currentTarget.nextElementSibling?.classList.remove('hidden')
                              }}
                            />
                            <span className="text-2xl hidden">{game.awayTeam.flag}</span>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              game.group.startsWith('Group') ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                            }`}>
                              {game.group}
                            </span>
                            <span className="text-blue-300 text-sm font-medium">{formatTime(game.date)}</span>
                            {existingPrediction && (
                              <span className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 text-yellow-400 border border-yellow-500/40 px-3 py-1 rounded-full text-xs font-medium">
                                ✓ Predicted
                              </span>
                            )}
                            {isAvailable && !existingPrediction && (
                              <span className="bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-400 border border-green-500/40 px-3 py-1 rounded-full text-xs font-medium">
                                Open
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}



