type GameStatus = 'upcoming' | 'live' | 'finished'
type TabType = 'predictions' | 'stats' | 'standings'

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

interface UserPrediction {
  gameId: string
  prediction: PredictionType
  timestamp: Date
  wager?: number
}

// Official FIFA World Cup 2026 Schedule (June 11 - July 19, 2026)
const sampleGames: Game[] = [
  // Thursday, 11 June 2026
  {
    id: '1',
    homeTeam: { id: 'mx', name: 'Mexico', flag: '🇲🇽' },
    awayTeam: { id: 'za', name: 'South Africa', flag: '🇿🇦' },
    date: new Date('2026-06-11T17:00:00'),
    venue: 'Mexico City Stadium',
    group: 'Group A',
    status: 'upcoming'
  },
  {
    id: '2',
    homeTeam: { id: 'kr', name: 'Korea Republic', flag: '🇰🇷' },
    awayTeam: { id: 'cz', name: 'Czechia', flag: '🇨🇿' },
    date: new Date('2026-06-11T20:00:00'),
    venue: 'Estadio Guadalajara',
    group: 'Group A',
    status: 'upcoming'
  },
  // Friday, 12 June 2026
  {
    id: '3',
    homeTeam: { id: 'ca', name: 'Canada', flag: '🇨🇦' },
    awayTeam: { id: 'ba', name: 'Bosnia and Herzegovina', flag: '🇧🇦' },
    date: new Date('2026-06-12T17:00:00'),
    venue: 'Toronto Stadium',
    group: 'Group B',
    status: 'upcoming'
  },
  {
    id: '4',
    homeTeam: { id: 'us', name: 'USA', flag: '🇺🇸' },
    awayTeam: { id: 'py', name: 'Paraguay', flag: '🇵🇾' },
    date: new Date('2026-06-12T20:00:00'),
    venue: 'Los Angeles Stadium',
    group: 'Group D',
    status: 'upcoming'
  },
  // Saturday, 13 June 2026
  {
    id: '5',
    homeTeam: { id: 'ht', name: 'Haiti', flag: '🇭🇹' },
    awayTeam: { id: 'gb-sct', name: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
    date: new Date('2026-06-13T14:00:00'),
    venue: 'Boston Stadium',
    group: 'Group C',
    status: 'upcoming'
  },
  {
    id: '6',
    homeTeam: { id: 'au', name: 'Australia', flag: '🇦🇺' },
    awayTeam: { id: 'tr', name: 'Türkiye', flag: '🇹🇷' },
    date: new Date('2026-06-13T17:00:00'),
    venue: 'BC Place Vancouver',
    group: 'Group D',
    status: 'upcoming'
  },
  {
    id: '7',
    homeTeam: { id: 'br', name: 'Brazil', flag: '🇧🇷' },
    awayTeam: { id: 'ma', name: 'Morocco', flag: '🇲🇦' },
    date: new Date('2026-06-13T20:00:00'),
    venue: 'New York New Jersey Stadium',
    group: 'Group C',
    status: 'upcoming'
  },
  {
    id: '8',
    homeTeam: { id: 'qa', name: 'Qatar', flag: '🇶🇦' },
    awayTeam: { id: 'ch', name: 'Switzerland', flag: '🇨🇭' },
    date: new Date('2026-06-13T20:00:00'),
    venue: 'San Francisco Bay Area Stadium',
    group: 'Group B',
    status: 'upcoming'
  },
  // Sunday, 14 June 2026
  {
    id: '9',
    homeTeam: { id: 'ci', name: 'Côte d\'Ivoire', flag: '🇨🇮' },
    awayTeam: { id: 'ec', name: 'Ecuador', flag: '🇪🇨' },
    date: new Date('2026-06-14T14:00:00'),
    venue: 'Philadelphia Stadium',
    group: 'Group E',
    status: 'upcoming'
  },
  {
    id: '10',
    homeTeam: { id: 'de', name: 'Germany', flag: '🇩🇪' },
    awayTeam: { id: 'cw', name: 'Curaçao', flag: '🇨🇼' },
    date: new Date('2026-06-14T17:00:00'),
    venue: 'Houston Stadium',
    group: 'Group E',
    status: 'upcoming'
  },
  {
    id: '11',
    homeTeam: { id: 'nl', name: 'Netherlands', flag: '🇳🇱' },
    awayTeam: { id: 'jp', name: 'Japan', flag: '🇯🇵' },
    date: new Date('2026-06-14T20:00:00'),
    venue: 'Dallas Stadium',
    group: 'Group F',
    status: 'upcoming'
  },
  {
    id: '12',
    homeTeam: { id: 'se', name: 'Sweden', flag: '🇸🇪' },
    awayTeam: { id: 'tn', name: 'Tunisia', flag: '🇹🇳' },
    date: new Date('2026-06-14T20:00:00'),
    venue: 'Estadio Monterrey',
    group: 'Group F',
    status: 'upcoming'
  },
  // Monday, 15 June 2026
  {
    id: '13',
    homeTeam: { id: 'sa', name: 'Saudi Arabia', flag: '🇸🇦' },
    awayTeam: { id: 'uy', name: 'Uruguay', flag: '🇺🇾' },
    date: new Date('2026-06-15T14:00:00'),
    venue: 'Miami Stadium',
    group: 'Group H',
    status: 'upcoming'
  },
  {
    id: '14',
    homeTeam: { id: 'es', name: 'Spain', flag: '🇪🇸' },
    awayTeam: { id: 'cv', name: 'Cabo Verde', flag: '🇨🇻' },
    date: new Date('2026-06-15T17:00:00'),
    venue: 'Atlanta Stadium',
    group: 'Group H',
    status: 'upcoming'
  },
  {
    id: '15',
    homeTeam: { id: 'ir', name: 'IR Iran', flag: '🇮🇷' },
    awayTeam: { id: 'nz', name: 'New Zealand', flag: '🇳🇿' },
    date: new Date('2026-06-15T20:00:00'),
    venue: 'Los Angeles Stadium',
    group: 'Group G',
    status: 'upcoming'
  },
  {
    id: '16',
    homeTeam: { id: 'be', name: 'Belgium', flag: '🇧🇪' },
    awayTeam: { id: 'eg', name: 'Egypt', flag: '🇪🇬' },
    date: new Date('2026-06-15T20:00:00'),
    venue: 'Seattle Stadium',
    group: 'Group G',
    status: 'upcoming'
  },
  // Tuesday, 16 June 2026
  {
    id: '17',
    homeTeam: { id: 'fr', name: 'France', flag: '🇫🇷' },
    awayTeam: { id: 'sn', name: 'Senegal', flag: '🇸🇳' },
    date: new Date('2026-06-16T14:00:00'),
    venue: 'New York New Jersey Stadium',
    group: 'Group I',
    status: 'upcoming'
  },
  {
    id: '18',
    homeTeam: { id: 'iq', name: 'Iraq', flag: '🇮🇶' },
    awayTeam: { id: 'no', name: 'Norway', flag: '🇳🇴' },
    date: new Date('2026-06-16T17:00:00'),
    venue: 'Boston Stadium',
    group: 'Group I',
    status: 'upcoming'
  },
  {
    id: '19',
    homeTeam: { id: 'ar', name: 'Argentina', flag: '🇦🇷' },
    awayTeam: { id: 'dz', name: 'Algeria', flag: '🇩🇿' },
    date: new Date('2026-06-16T20:00:00'),
    venue: 'Kansas City Stadium',
    group: 'Group J',
    status: 'upcoming'
  },
  {
    id: '20',
    homeTeam: { id: 'at', name: 'Austria', flag: '🇦🇹' },
    awayTeam: { id: 'jo', name: 'Jordan', flag: '🇯🇴' },
    date: new Date('2026-06-16T20:00:00'),
    venue: 'San Francisco Bay Area Stadium',
    group: 'Group J',
    status: 'upcoming'
  },
  // Wednesday, 17 June 2026
  {
    id: '21',
    homeTeam: { id: 'gh', name: 'Ghana', flag: '🇬🇭' },
    awayTeam: { id: 'pa', name: 'Panama', flag: '🇵🇦' },
    date: new Date('2026-06-17T14:00:00'),
    venue: 'Toronto Stadium',
    group: 'Group L',
    status: 'upcoming'
  },
  {
    id: '22',
    homeTeam: { id: 'gb-eng', name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    awayTeam: { id: 'hr', name: 'Croatia', flag: '🇭🇷' },
    date: new Date('2026-06-17T17:00:00'),
    venue: 'Dallas Stadium',
    group: 'Group L',
    status: 'upcoming'
  },
  {
    id: '23',
    homeTeam: { id: 'pt', name: 'Portugal', flag: '🇵🇹' },
    awayTeam: { id: 'cd', name: 'Congo DR', flag: '🇨🇩' },
    date: new Date('2026-06-17T20:00:00'),
    venue: 'Houston Stadium',
    group: 'Group K',
    status: 'upcoming'
  },
  {
    id: '24',
    homeTeam: { id: 'uz', name: 'Uzbekistan', flag: '🇺🇿' },
    awayTeam: { id: 'co', name: 'Colombia', flag: '🇨🇴' },
    date: new Date('2026-06-17T20:00:00'),
    venue: 'Mexico City Stadium',
    group: 'Group K',
    status: 'upcoming'
  },
  // Thursday, 18 June 2026
  {
    id: '25',
    homeTeam: { id: 'cz', name: 'Czechia', flag: '🇨🇿' },
    awayTeam: { id: 'za', name: 'South Africa', flag: '🇿🇦' },
    date: new Date('2026-06-18T14:00:00'),
    venue: 'Atlanta Stadium',
    group: 'Group A',
    status: 'upcoming'
  },
  {
    id: '26',
    homeTeam: { id: 'ch', name: 'Switzerland', flag: '🇨🇭' },
    awayTeam: { id: 'ba', name: 'Bosnia and Herzegovina', flag: '🇧🇦' },
    date: new Date('2026-06-18T17:00:00'),
    venue: 'Los Angeles Stadium',
    group: 'Group B',
    status: 'upcoming'
  },
  {
    id: '27',
    homeTeam: { id: 'ca', name: 'Canada', flag: '🇨🇦' },
    awayTeam: { id: 'qa', name: 'Qatar', flag: '🇶🇦' },
    date: new Date('2026-06-18T20:00:00'),
    venue: 'BC Place Vancouver',
    group: 'Group B',
    status: 'upcoming'
  },
  {
    id: '28',
    homeTeam: { id: 'mx', name: 'Mexico', flag: '🇲🇽' },
    awayTeam: { id: 'kr', name: 'Korea Republic', flag: '🇰🇷' },
    date: new Date('2026-06-18T20:00:00'),
    venue: 'Estadio Guadalajara',
    group: 'Group A',
    status: 'upcoming'
  },
  // Friday, 19 June 2026
  {
    id: '29',
    homeTeam: { id: 'br', name: 'Brazil', flag: '🇧🇷' },
    awayTeam: { id: 'ht', name: 'Haiti', flag: '🇭🇹' },
    date: new Date('2026-06-19T14:00:00'),
    venue: 'Philadelphia Stadium',
    group: 'Group C',
    status: 'upcoming'
  },
  {
    id: '30',
    homeTeam: { id: 'gb-sct', name: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
    awayTeam: { id: 'ma', name: 'Morocco', flag: '🇲🇦' },
    date: new Date('2026-06-19T17:00:00'),
    venue: 'Boston Stadium',
    group: 'Group C',
    status: 'upcoming'
  },
  {
    id: '31',
    homeTeam: { id: 'tr', name: 'Türkiye', flag: '🇹🇷' },
    awayTeam: { id: 'py', name: 'Paraguay', flag: '🇵🇾' },
    date: new Date('2026-06-19T20:00:00'),
    venue: 'San Francisco Bay Area Stadium',
    group: 'Group D',
    status: 'upcoming'
  },
  {
    id: '32',
    homeTeam: { id: 'us', name: 'USA', flag: '🇺🇸' },
    awayTeam: { id: 'au', name: 'Australia', flag: '🇦🇺' },
    date: new Date('2026-06-19T20:00:00'),
    venue: 'Seattle Stadium',
    group: 'Group D',
    status: 'upcoming'
  },
  // Saturday, 20 June 2026
  {
    id: '33',
    homeTeam: { id: 'de', name: 'Germany', flag: '🇩🇪' },
    awayTeam: { id: 'ci', name: 'Côte d\'Ivoire', flag: '🇨🇮' },
    date: new Date('2026-06-20T14:00:00'),
    venue: 'Toronto Stadium',
    group: 'Group E',
    status: 'upcoming'
  },
  {
    id: '34',
    homeTeam: { id: 'ec', name: 'Ecuador', flag: '🇪🇨' },
    awayTeam: { id: 'cw', name: 'Curaçao', flag: '🇨🇼' },
    date: new Date('2026-06-20T17:00:00'),
    venue: 'Kansas City Stadium',
    group: 'Group E',
    status: 'upcoming'
  },
  {
    id: '35',
    homeTeam: { id: 'nl', name: 'Netherlands', flag: '🇳🇱' },
    awayTeam: { id: 'se', name: 'Sweden', flag: '🇸🇪' },
    date: new Date('2026-06-20T20:00:00'),
    venue: 'Houston Stadium',
    group: 'Group F',
    status: 'upcoming'
  },
  {
    id: '36',
    homeTeam: { id: 'tn', name: 'Tunisia', flag: '🇹🇳' },
    awayTeam: { id: 'jp', name: 'Japan', flag: '🇯🇵' },
    date: new Date('2026-06-20T20:00:00'),
    venue: 'Estadio Monterrey',
    group: 'Group F',
    status: 'upcoming'
  },
  // Sunday, 21 June 2026
  {
    id: '37',
    homeTeam: { id: 'uy', name: 'Uruguay', flag: '🇺🇾' },
    awayTeam: { id: 'cv', name: 'Cabo Verde', flag: '🇨🇻' },
    date: new Date('2026-06-21T14:00:00'),
    venue: 'Miami Stadium',
    group: 'Group H',
    status: 'upcoming'
  },
  {
    id: '38',
    homeTeam: { id: 'es', name: 'Spain', flag: '🇪🇸' },
    awayTeam: { id: 'sa', name: 'Saudi Arabia', flag: '🇸🇦' },
    date: new Date('2026-06-21T17:00:00'),
    venue: 'Atlanta Stadium',
    group: 'Group H',
    status: 'upcoming'
  },
  {
    id: '39',
    homeTeam: { id: 'be', name: 'Belgium', flag: '🇧🇪' },
    awayTeam: { id: 'ir', name: 'IR Iran', flag: '🇮🇷' },
    date: new Date('2026-06-21T20:00:00'),
    venue: 'Los Angeles Stadium',
    group: 'Group G',
    status: 'upcoming'
  },
  {
    id: '40',
    homeTeam: { id: 'nz', name: 'New Zealand', flag: '🇳🇿' },
    awayTeam: { id: 'eg', name: 'Egypt', flag: '🇪🇬' },
    date: new Date('2026-06-21T20:00:00'),
    venue: 'BC Place Vancouver',
    group: 'Group G',
    status: 'upcoming'
  },
  // Monday, 22 June 2026
  {
    id: '41',
    homeTeam: { id: 'no', name: 'Norway', flag: '🇳🇴' },
    awayTeam: { id: 'sn', name: 'Senegal', flag: '🇸🇳' },
    date: new Date('2026-06-22T14:00:00'),
    venue: 'New York New Jersey Stadium',
    group: 'Group I',
    status: 'upcoming'
  },
  {
    id: '42',
    homeTeam: { id: 'fr', name: 'France', flag: '🇫🇷' },
    awayTeam: { id: 'iq', name: 'Iraq', flag: '🇮🇶' },
    date: new Date('2026-06-22T17:00:00'),
    venue: 'Philadelphia Stadium',
    group: 'Group I',
    status: 'upcoming'
  },
  {
    id: '43',
    homeTeam: { id: 'ar', name: 'Argentina', flag: '🇦🇷' },
    awayTeam: { id: 'at', name: 'Austria', flag: '🇦🇹' },
    date: new Date('2026-06-22T20:00:00'),
    venue: 'Dallas Stadium',
    group: 'Group J',
    status: 'upcoming'
  },
  {
    id: '44',
    homeTeam: { id: 'jo', name: 'Jordan', flag: '🇯🇴' },
    awayTeam: { id: 'dz', name: 'Algeria', flag: '🇩🇿' },
    date: new Date('2026-06-22T20:00:00'),
    venue: 'San Francisco Bay Area Stadium',
    group: 'Group J',
    status: 'upcoming'
  },
  // Tuesday, 23 June 2026
  {
    id: '45',
    homeTeam: { id: 'gb-eng', name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    awayTeam: { id: 'gh', name: 'Ghana', flag: '🇬🇭' },
    date: new Date('2026-06-23T14:00:00'),
    venue: 'Boston Stadium',
    group: 'Group L',
    status: 'upcoming'
  },
  {
    id: '46',
    homeTeam: { id: 'pa', name: 'Panama', flag: '🇵🇦' },
    awayTeam: { id: 'hr', name: 'Croatia', flag: '🇭🇷' },
    date: new Date('2026-06-23T17:00:00'),
    venue: 'Toronto Stadium',
    group: 'Group L',
    status: 'upcoming'
  },
  {
    id: '47',
    homeTeam: { id: 'pt', name: 'Portugal', flag: '🇵🇹' },
    awayTeam: { id: 'uz', name: 'Uzbekistan', flag: '🇺🇿' },
    date: new Date('2026-06-23T20:00:00'),
    venue: 'Houston Stadium',
    group: 'Group K',
    status: 'upcoming'
  },
  {
    id: '48',
    homeTeam: { id: 'co', name: 'Colombia', flag: '🇨🇴' },
    awayTeam: { id: 'cd', name: 'Congo DR', flag: '🇨🇩' },
    date: new Date('2026-06-23T20:00:00'),
    venue: 'Estadio Guadalajara',
    group: 'Group K',
    status: 'upcoming'
  },
  // Wednesday, 24 June 2026
  {
    id: '49',
    homeTeam: { id: 'gb-sct', name: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
    awayTeam: { id: 'br', name: 'Brazil', flag: '🇧🇷' },
    date: new Date('2026-06-24T14:00:00'),
    venue: 'Miami Stadium',
    group: 'Group C',
    status: 'upcoming'
  },
  {
    id: '50',
    homeTeam: { id: 'ma', name: 'Morocco', flag: '🇲🇦' },
    awayTeam: { id: 'ht', name: 'Haiti', flag: '🇭🇹' },
    date: new Date('2026-06-24T17:00:00'),
    venue: 'Atlanta Stadium',
    group: 'Group C',
    status: 'upcoming'
  },
  {
    id: '51',
    homeTeam: { id: 'ch', name: 'Switzerland', flag: '🇨🇭' },
    awayTeam: { id: 'ca', name: 'Canada', flag: '🇨🇦' },
    date: new Date('2026-06-24T20:00:00'),
    venue: 'BC Place Vancouver',
    group: 'Group B',
    status: 'upcoming'
  },
  {
    id: '52',
    homeTeam: { id: 'ba', name: 'Bosnia and Herzegovina', flag: '🇧🇦' },
    awayTeam: { id: 'qa', name: 'Qatar', flag: '🇶🇦' },
    date: new Date('2026-06-24T20:00:00'),
    venue: 'Seattle Stadium',
    group: 'Group B',
    status: 'upcoming'
  },
  {
    id: '53',
    homeTeam: { id: 'cz', name: 'Czechia', flag: '🇨🇿' },
    awayTeam: { id: 'mx', name: 'Mexico', flag: '🇲🇽' },
    date: new Date('2026-06-24T20:00:00'),
    venue: 'Mexico City Stadium',
    group: 'Group A',
    status: 'upcoming'
  },
  {
    id: '54',
    homeTeam: { id: 'za', name: 'South Africa', flag: '🇿🇦' },
    awayTeam: { id: 'kr', name: 'Korea Republic', flag: '🇰🇷' },
    date: new Date('2026-06-24T20:00:00'),
    venue: 'Estadio Monterrey',
    group: 'Group A',
    status: 'upcoming'
  },
  // Thursday, 25 June 2026
  {
    id: '55',
    homeTeam: { id: 'cw', name: 'Curaçao', flag: '🇨🇼' },
    awayTeam: { id: 'ci', name: 'Côte d\'Ivoire', flag: '🇨🇮' },
    date: new Date('2026-06-25T14:00:00'),
    venue: 'Philadelphia Stadium',
    group: 'Group E',
    status: 'upcoming'
  },
  {
    id: '56',
    homeTeam: { id: 'ec', name: 'Ecuador', flag: '🇪🇨' },
    awayTeam: { id: 'de', name: 'Germany', flag: '🇩🇪' },
    date: new Date('2026-06-25T17:00:00'),
    venue: 'New York New Jersey Stadium',
    group: 'Group E',
    status: 'upcoming'
  },
  {
    id: '57',
    homeTeam: { id: 'jp', name: 'Japan', flag: '🇯🇵' },
    awayTeam: { id: 'se', name: 'Sweden', flag: '🇸🇪' },
    date: new Date('2026-06-25T20:00:00'),
    venue: 'Dallas Stadium',
    group: 'Group F',
    status: 'upcoming'
  },
  {
    id: '58',
    homeTeam: { id: 'tn', name: 'Tunisia', flag: '🇹🇳' },
    awayTeam: { id: 'nl', name: 'Netherlands', flag: '🇳🇱' },
    date: new Date('2026-06-25T20:00:00'),
    venue: 'Kansas City Stadium',
    group: 'Group F',
    status: 'upcoming'
  },
  {
    id: '59',
    homeTeam: { id: 'tr', name: 'Türkiye', flag: '🇹🇷' },
    awayTeam: { id: 'us', name: 'USA', flag: '🇺🇸' },
    date: new Date('2026-06-25T20:00:00'),
    venue: 'Los Angeles Stadium',
    group: 'Group D',
    status: 'upcoming'
  },
  {
    id: '60',
    homeTeam: { id: 'py', name: 'Paraguay', flag: '🇵🇾' },
    awayTeam: { id: 'au', name: 'Australia', flag: '🇦🇺' },
    date: new Date('2026-06-25T20:00:00'),
    venue: 'San Francisco Bay Area Stadium',
    group: 'Group D',
    status: 'upcoming'
  },
  // Friday, 26 June 2026
  {
    id: '61',
    homeTeam: { id: 'no', name: 'Norway', flag: '🇳🇴' },
    awayTeam: { id: 'fr', name: 'France', flag: '🇫🇷' },
    date: new Date('2026-06-26T14:00:00'),
    venue: 'Boston Stadium',
    group: 'Group I',
    status: 'upcoming'
  },
  {
    id: '62',
    homeTeam: { id: 'sn', name: 'Senegal', flag: '🇸🇳' },
    awayTeam: { id: 'iq', name: 'Iraq', flag: '🇮🇶' },
    date: new Date('2026-06-26T17:00:00'),
    venue: 'Toronto Stadium',
    group: 'Group I',
    status: 'upcoming'
  },
  {
    id: '63',
    homeTeam: { id: 'eg', name: 'Egypt', flag: '🇪🇬' },
    awayTeam: { id: 'ir', name: 'IR Iran', flag: '🇮🇷' },
    date: new Date('2026-06-26T20:00:00'),
    venue: 'Seattle Stadium',
    group: 'Group G',
    status: 'upcoming'
  },
  {
    id: '64',
    homeTeam: { id: 'nz', name: 'New Zealand', flag: '🇳🇿' },
    awayTeam: { id: 'be', name: 'Belgium', flag: '🇧🇪' },
    date: new Date('2026-06-26T20:00:00'),
    venue: 'BC Place Vancouver',
    group: 'Group G',
    status: 'upcoming'
  },
  {
    id: '65',
    homeTeam: { id: 'cv', name: 'Cabo Verde', flag: '🇨🇻' },
    awayTeam: { id: 'sa', name: 'Saudi Arabia', flag: '🇸🇦' },
    date: new Date('2026-06-26T20:00:00'),
    venue: 'Houston Stadium',
    group: 'Group H',
    status: 'upcoming'
  },
  {
    id: '66',
    homeTeam: { id: 'uy', name: 'Uruguay', flag: '🇺🇾' },
    awayTeam: { id: 'es', name: 'Spain', flag: '🇪🇸' },
    date: new Date('2026-06-26T20:00:00'),
    venue: 'Estadio Guadalajara',
    group: 'Group H',
    status: 'upcoming'
  },
  // Saturday, 27 June 2026
  {
    id: '67',
    homeTeam: { id: 'pa', name: 'Panama', flag: '🇵🇦' },
    awayTeam: { id: 'gb-eng', name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    date: new Date('2026-06-27T14:00:00'),
    venue: 'New York New Jersey Stadium',
    group: 'Group L',
    status: 'upcoming'
  },
  {
    id: '68',
    homeTeam: { id: 'hr', name: 'Croatia', flag: '🇭🇷' },
    awayTeam: { id: 'gh', name: 'Ghana', flag: '🇬🇭' },
    date: new Date('2026-06-27T17:00:00'),
    venue: 'Philadelphia Stadium',
    group: 'Group L',
    status: 'upcoming'
  },
  {
    id: '69',
    homeTeam: { id: 'dz', name: 'Algeria', flag: '🇩🇿' },
    awayTeam: { id: 'at', name: 'Austria', flag: '🇦🇹' },
    date: new Date('2026-06-27T20:00:00'),
    venue: 'Kansas City Stadium',
    group: 'Group J',
    status: 'upcoming'
  },
  {
    id: '70',
    homeTeam: { id: 'jo', name: 'Jordan', flag: '🇯🇴' },
    awayTeam: { id: 'ar', name: 'Argentina', flag: '🇦🇷' },
    date: new Date('2026-06-27T20:00:00'),
    venue: 'Dallas Stadium',
    group: 'Group J',
    status: 'upcoming'
  },
  {
    id: '71',
    homeTeam: { id: 'co', name: 'Colombia', flag: '🇨🇴' },
    awayTeam: { id: 'pt', name: 'Portugal', flag: '🇵🇹' },
    date: new Date('2026-06-27T20:00:00'),
    venue: 'Miami Stadium',
    group: 'Group K',
    status: 'upcoming'
  },
  {
    id: '72',
    homeTeam: { id: 'cd', name: 'Congo DR', flag: '🇨🇩' },
    awayTeam: { id: 'uz', name: 'Uzbekistan', flag: '🇺🇿' },
    date: new Date('2026-06-27T20:00:00'),
    venue: 'Atlanta Stadium',
    group: 'Group K',
    status: 'upcoming'
  },
  // Round of 32
  {
    id: '73',
    homeTeam: { id: 'tba', name: 'Group A runners-up', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Group B runners-up', flag: '🏆' },
    date: new Date('2026-06-28T17:00:00'),
    venue: 'Los Angeles Stadium',
    group: 'Round of 32',
    status: 'upcoming'
  },
  {
    id: '74',
    homeTeam: { id: 'tba', name: 'Group E winners', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Group A/B/C/D/F third place', flag: '🏆' },
    date: new Date('2026-06-29T14:00:00'),
    venue: 'Boston Stadium',
    group: 'Round of 32',
    status: 'upcoming'
  },
  {
    id: '75',
    homeTeam: { id: 'tba', name: 'Group F winners', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Group C runners-up', flag: '🏆' },
    date: new Date('2026-06-29T17:00:00'),
    venue: 'Estadio Monterrey',
    group: 'Round of 32',
    status: 'upcoming'
  },
  {
    id: '76',
    homeTeam: { id: 'tba', name: 'Group C winners', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Group F runners-up', flag: '🏆' },
    date: new Date('2026-06-29T20:00:00'),
    venue: 'Houston Stadium',
    group: 'Round of 32',
    status: 'upcoming'
  },
  {
    id: '77',
    homeTeam: { id: 'tba', name: 'Group I winners', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Group C/D/F/G/H third place', flag: '🏆' },
    date: new Date('2026-06-30T14:00:00'),
    venue: 'New York New Jersey Stadium',
    group: 'Round of 32',
    status: 'upcoming'
  },
  {
    id: '78',
    homeTeam: { id: 'tba', name: 'Group E runners-up', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Group I runners-up', flag: '🏆' },
    date: new Date('2026-06-30T17:00:00'),
    venue: 'Dallas Stadium',
    group: 'Round of 32',
    status: 'upcoming'
  },
  {
    id: '79',
    homeTeam: { id: 'tba', name: 'Group A winners', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Group C/E/F/H/I third place', flag: '🏆' },
    date: new Date('2026-06-30T20:00:00'),
    venue: 'Mexico City Stadium',
    group: 'Round of 32',
    status: 'upcoming'
  },
  {
    id: '80',
    homeTeam: { id: 'tba', name: 'Group L winners', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Group E/H/I/J/K third place', flag: '🏆' },
    date: new Date('2026-07-01T14:00:00'),
    venue: 'Atlanta Stadium',
    group: 'Round of 32',
    status: 'upcoming'
  },
  {
    id: '81',
    homeTeam: { id: 'tba', name: 'Group D winners', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Group B/E/F/I/J third place', flag: '🏆' },
    date: new Date('2026-07-01T17:00:00'),
    venue: 'San Francisco Bay Area Stadium',
    group: 'Round of 32',
    status: 'upcoming'
  },
  {
    id: '82',
    homeTeam: { id: 'tba', name: 'Group G winners', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Group A/E/H/I/J third place', flag: '🏆' },
    date: new Date('2026-07-01T20:00:00'),
    venue: 'Seattle Stadium',
    group: 'Round of 32',
    status: 'upcoming'
  },
  {
    id: '83',
    homeTeam: { id: 'tba', name: 'Group K runners-up', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Group L runners-up', flag: '🏆' },
    date: new Date('2026-07-02T14:00:00'),
    venue: 'Toronto Stadium',
    group: 'Round of 32',
    status: 'upcoming'
  },
  {
    id: '84',
    homeTeam: { id: 'tba', name: 'Group H winners', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Group J runners-up', flag: '🏆' },
    date: new Date('2026-07-02T17:00:00'),
    venue: 'Los Angeles Stadium',
    group: 'Round of 32',
    status: 'upcoming'
  },
  {
    id: '85',
    homeTeam: { id: 'tba', name: 'Group B winners', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Group E/F/G/I/J third place', flag: '🏆' },
    date: new Date('2026-07-02T20:00:00'),
    venue: 'BC Place Vancouver',
    group: 'Round of 32',
    status: 'upcoming'
  },
  {
    id: '86',
    homeTeam: { id: 'tba', name: 'Group J winners', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Group H runners-up', flag: '🏆' },
    date: new Date('2026-07-03T14:00:00'),
    venue: 'Miami Stadium',
    group: 'Round of 32',
    status: 'upcoming'
  },
  {
    id: '87',
    homeTeam: { id: 'tba', name: 'Group K winners', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Group D/E/I/J/L third place', flag: '🏆' },
    date: new Date('2026-07-03T17:00:00'),
    venue: 'Kansas City Stadium',
    group: 'Round of 32',
    status: 'upcoming'
  },
  {
    id: '88',
    homeTeam: { id: 'tba', name: 'Group D runners-up', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Group G runners-up', flag: '🏆' },
    date: new Date('2026-07-03T20:00:00'),
    venue: 'Dallas Stadium',
    group: 'Round of 32',
    status: 'upcoming'
  },
  // Round of 16
  {
    id: '89',
    homeTeam: { id: 'tba', name: 'Winner match 74', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Winner match 77', flag: '🏆' },
    date: new Date('2026-07-04T14:00:00'),
    venue: 'Philadelphia Stadium',
    group: 'Round of 16',
    status: 'upcoming'
  },
  {
    id: '90',
    homeTeam: { id: 'tba', name: 'Winner match 73', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Winner match 75', flag: '🏆' },
    date: new Date('2026-07-04T17:00:00'),
    venue: 'Houston Stadium',
    group: 'Round of 16',
    status: 'upcoming'
  },
  {
    id: '91',
    homeTeam: { id: 'tba', name: 'Winner match 76', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Winner match 78', flag: '🏆' },
    date: new Date('2026-07-05T14:00:00'),
    venue: 'New York New Jersey Stadium',
    group: 'Round of 16',
    status: 'upcoming'
  },
  {
    id: '92',
    homeTeam: { id: 'tba', name: 'Winner match 79', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Winner match 80', flag: '🏆' },
    date: new Date('2026-07-05T17:00:00'),
    venue: 'Mexico City Stadium',
    group: 'Round of 16',
    status: 'upcoming'
  },
  {
    id: '93',
    homeTeam: { id: 'tba', name: 'Winner match 83', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Winner match 84', flag: '🏆' },
    date: new Date('2026-07-06T14:00:00'),
    venue: 'Dallas Stadium',
    group: 'Round of 16',
    status: 'upcoming'
  },
  {
    id: '94',
    homeTeam: { id: 'tba', name: 'Winner match 81', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Winner match 82', flag: '🏆' },
    date: new Date('2026-07-06T17:00:00'),
    venue: 'Seattle Stadium',
    group: 'Round of 16',
    status: 'upcoming'
  },
  {
    id: '95',
    homeTeam: { id: 'tba', name: 'Winner match 86', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Winner match 88', flag: '🏆' },
    date: new Date('2026-07-07T14:00:00'),
    venue: 'Atlanta Stadium',
    group: 'Round of 16',
    status: 'upcoming'
  },
  {
    id: '96',
    homeTeam: { id: 'tba', name: 'Winner match 85', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Winner match 87', flag: '🏆' },
    date: new Date('2026-07-07T17:00:00'),
    venue: 'BC Place Vancouver',
    group: 'Round of 16',
    status: 'upcoming'
  },
  // Quarter Finals
  {
    id: '97',
    homeTeam: { id: 'tba', name: 'Winner match 89', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Winner match 90', flag: '🏆' },
    date: new Date('2026-07-09T17:00:00'),
    venue: 'Boston Stadium',
    group: 'Quarter Final',
    status: 'upcoming'
  },
  {
    id: '98',
    homeTeam: { id: 'tba', name: 'Winner match 93', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Winner match 94', flag: '🏆' },
    date: new Date('2026-07-10T17:00:00'),
    venue: 'Los Angeles Stadium',
    group: 'Quarter Final',
    status: 'upcoming'
  },
  {
    id: '99',
    homeTeam: { id: 'tba', name: 'Winner match 91', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Winner match 92', flag: '🏆' },
    date: new Date('2026-07-11T14:00:00'),
    venue: 'Miami Stadium',
    group: 'Quarter Final',
    status: 'upcoming'
  },
  {
    id: '100',
    homeTeam: { id: 'tba', name: 'Winner match 95', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Winner match 96', flag: '🏆' },
    date: new Date('2026-07-11T17:00:00'),
    venue: 'Kansas City Stadium',
    group: 'Quarter Final',
    status: 'upcoming'
  },
  // Semi Finals
  {
    id: '101',
    homeTeam: { id: 'tba', name: 'Winner match 97', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Winner match 98', flag: '🏆' },
    date: new Date('2026-07-14T17:00:00'),
    venue: 'Dallas Stadium',
    group: 'Semi Final',
    status: 'upcoming'
  },
  {
    id: '102',
    homeTeam: { id: 'tba', name: 'Winner match 99', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Winner match 100', flag: '🏆' },
    date: new Date('2026-07-15T17:00:00'),
    venue: 'Atlanta Stadium',
    group: 'Semi Final',
    status: 'upcoming'
  },
  // Bronze Medal Game
  {
    id: '103',
    homeTeam: { id: 'tba', name: 'Runner-up match 101', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Runner-up match 102', flag: '🏆' },
    date: new Date('2026-07-18T17:00:00'),
    venue: 'Miami Stadium',
    group: 'Bronze Medal',
    status: 'upcoming'
  },
  // Final
  {
    id: '104',
    homeTeam: { id: 'tba', name: 'Winner match 101', flag: '🏆' },
    awayTeam: { id: 'tba', name: 'Winner match 102', flag: '🏆' },
    date: new Date('2026-07-19T17:00:00'),
    venue: 'New York New Jersey Stadium',
    group: 'Final',
    status: 'upcoming'
  }
]

// Player stats will be fetched dynamically from ESPN API during the tournament
// Stats are calculated from actual match results as games progress

// Team stats will be fetched dynamically from ESPN API during the tournament
// Stats are calculated from actual match results as games progress


function StatsSection() {
  const [playerStats, setPlayerStats] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true)
        setPlayerStats([])
      } catch (error) {
        console.error('Failed to load stats:', error)
      } finally {
        setLoading(false)
      }
    }
    loadStats()
    
    // Refresh stats every 5 minutes during tournament
    const interval = setInterval(loadStats, 300000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-green-950/80 via-blue-950/80 to-red-950/80 backdrop-blur-lg rounded-2xl p-6 border border-yellow-500/30 shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-6">📊 Player Statistics</h2>
        {loading ? (
          <p className="text-white text-center">Loading stats from ESPN API...</p>
        ) : playerStats.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No player stats available yet. Stats will update as matches are played.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-yellow-400 font-semibold">Player</th>
                  <th className="text-center py-3 px-4 text-yellow-400 font-semibold">Team</th>
                  <th className="text-center py-3 px-4 text-green-400 font-semibold">Goals</th>
                  <th className="text-center py-3 px-4 text-blue-400 font-semibold">Assists</th>
                  <th className="text-center py-3 px-4 text-yellow-400 font-semibold">Yellow Cards</th>
                  <th className="text-center py-3 px-4 text-red-400 font-semibold">Red Cards</th>
                </tr>
              </thead>
              <tbody>
                {playerStats.map((player) => (
                  <tr key={player.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                    <td className="py-3 px-4 text-white font-medium">{player.name}</td>
                    <td className="py-3 px-4 text-center text-gray-300">{player.team}</td>
                    <td className="py-3 px-4 text-center text-green-400 font-bold">{player.goals}</td>
                    <td className="py-3 px-4 text-center text-blue-400 font-bold">{player.assists}</td>
                    <td className="py-3 px-4 text-center text-yellow-400 font-bold">{player.yellowCards}</td>
                    <td className="py-3 px-4 text-center text-red-400 font-bold">{player.redCards}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

function StandingsSection() {
  const [teamStats, setTeamStats] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Initialize all 48 teams with zero stats (matching sampleGames IDs and flags)
  const allTeams = [
    { id: 'mx', name: 'Mexico', flag: '🇲🇽' },
    { id: 'za', name: 'South Africa', flag: '🇿🇦' },
    { id: 'kr', name: 'Korea Republic', flag: '🇰🇷' },
    { id: 'cz', name: 'Czechia', flag: '🇨🇿' },
    { id: 'ca', name: 'Canada', flag: '🇨🇦' },
    { id: 'ba', name: 'Bosnia and Herzegovina', flag: '🇧🇦' },
    { id: 'qa', name: 'Qatar', flag: '🇶🇦' },
    { id: 'ch', name: 'Switzerland', flag: '🇨🇭' },
    { id: 'ht', name: 'Haiti', flag: '🇭🇹' },
    { id: 'gb-sct', name: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
    { id: 'br', name: 'Brazil', flag: '🇧🇷' },
    { id: 'ma', name: 'Morocco', flag: '🇲🇦' },
    { id: 'us', name: 'USA', flag: '🇺🇸' },
    { id: 'py', name: 'Paraguay', flag: '🇵🇾' },
    { id: 'au', name: 'Australia', flag: '🇦🇺' },
    { id: 'tr', name: 'Türkiye', flag: '🇹🇷' },
    { id: 'ci', name: 'Côte d\'Ivoire', flag: '🇨🇮' },
    { id: 'ec', name: 'Ecuador', flag: '🇪🇨' },
    { id: 'de', name: 'Germany', flag: '🇩🇪' },
    { id: 'cw', name: 'Curaçao', flag: '🇨🇼' },
    { id: 'nl', name: 'Netherlands', flag: '🇳🇱' },
    { id: 'jp', name: 'Japan', flag: '🇯🇵' },
    { id: 'se', name: 'Sweden', flag: '🇸🇪' },
    { id: 'tn', name: 'Tunisia', flag: '🇹🇳' },
    { id: 'ir', name: 'IR Iran', flag: '🇮🇷' },
    { id: 'nz', name: 'New Zealand', flag: '🇳🇿' },
    { id: 'be', name: 'Belgium', flag: '🇧🇪' },
    { id: 'eg', name: 'Egypt', flag: '🇪🇬' },
    { id: 'sa', name: 'Saudi Arabia', flag: '🇸🇦' },
    { id: 'es', name: 'Spain', flag: '🇪🇸' },
    { id: 'cv', name: 'Cabo Verde', flag: '🇨🇻' },
    { id: 'uy', name: 'Uruguay', flag: '🇺🇾' },
    { id: 'fr', name: 'France', flag: '🇫🇷' },
    { id: 'sn', name: 'Senegal', flag: '🇸🇳' },
    { id: 'iq', name: 'Iraq', flag: '🇮🇶' },
    { id: 'no', name: 'Norway', flag: '🇳🇴' },
    { id: 'ar', name: 'Argentina', flag: '🇦🇷' },
    { id: 'dz', name: 'Algeria', flag: '🇩🇿' },
    { id: 'at', name: 'Austria', flag: '🇦🇹' },
    { id: 'jo', name: 'Jordan', flag: '🇯🇴' },
    { id: 'gh', name: 'Ghana', flag: '��' },
    { id: 'pa', name: 'Panama', flag: '��' },
    { id: 'gb-eng', name: 'England', flag: '�󠁧󠁢󠁥󠁮󠁧󠁿' },
    { id: 'hr', name: 'Croatia', flag: '��' },
    { id: 'pt', name: 'Portugal', flag: '��' },
    { id: 'uz', name: 'Uzbekistan', flag: '🇺�' },
    { id: 'co', name: 'Colombia', flag: '��' },
    { id: 'cd', name: 'Congo DR', flag: '��' },
  ]

  useEffect(() => {
    // Calculate standings from actual game results
    function calculateStandingsFromGames() {
      const statsMap = new Map<string, any>()
      
      // Initialize all teams with zero stats
      allTeams.forEach(team => {
        statsMap.set(team.id, {
          id: team.id,
          name: team.name,
          flag: team.flag,
          gamesPlayed: 0,
          wins: 0,
          ties: 0,
          losses: 0,
          pointsFor: 0,
          pointsAgainst: 0,
          last5Games: [] as ('win' | 'tie' | 'loss')[]
        })
      })
      
      // Update stats based on finished games
      sampleGames.forEach(game => {
        if (game.status === 'finished' && game.actualResult) {
          const homeStats = statsMap.get(game.homeTeam.id)
          const awayStats = statsMap.get(game.awayTeam.id)
          
          if (homeStats && awayStats) {
            homeStats.gamesPlayed++
            awayStats.gamesPlayed++
            
            // Determine score based on actual result
            let homeScore = 0
            let awayScore = 0
            
            if (game.actualResult === 'home') {
              homeScore = 1
              awayScore = 0
            } else if (game.actualResult === 'away') {
              homeScore = 0
              awayScore = 1
            } else {
              homeScore = 0
              awayScore = 0
            }
            
            homeStats.pointsFor += homeScore
            homeStats.pointsAgainst += awayScore
            awayStats.pointsFor += awayScore
            awayStats.pointsAgainst += homeScore
            
            if (homeScore > awayScore) {
              homeStats.wins++
              awayStats.losses++
            } else if (homeScore < awayScore) {
              awayStats.wins++
              homeStats.losses++
            } else {
              homeStats.ties++
              awayStats.ties++
            }
            
            // Only track last 3 games for group stage
            if (game.group.startsWith('Group')) {
              if (homeScore > awayScore) {
                homeStats.last5Games.push('win')
                awayStats.last5Games.push('loss')
              } else if (homeScore < awayScore) {
                awayStats.last5Games.push('win')
                homeStats.last5Games.push('loss')
              } else {
                homeStats.last5Games.push('tie')
                awayStats.last5Games.push('tie')
              }
              
              // Keep only last 3 games
              homeStats.last5Games = homeStats.last5Games.slice(-3)
              awayStats.last5Games = awayStats.last5Games.slice(-3)
            }
          }
        }
      })
      
      return Array.from(statsMap.values())
    }

    setLoading(true)
    const stats = calculateStandingsFromGames()
    setTeamStats(stats)
    setLoading(false)
  }, [])

  // Group the teams by their group
  const groups = [
    { name: 'Group A', teams: ['mx', 'za', 'kr', 'cz'] },
    { name: 'Group B', teams: ['ca', 'ba', 'qa', 'ch'] },
    { name: 'Group C', teams: ['ht', 'gb-sct', 'br', 'ma'] },
    { name: 'Group D', teams: ['us', 'py', 'au', 'tr'] },
    { name: 'Group E', teams: ['ci', 'ec', 'de', 'cw'] },
    { name: 'Group F', teams: ['nl', 'jp', 'se', 'tn'] },
    { name: 'Group G', teams: ['ir', 'nz', 'be', 'eg'] },
    { name: 'Group H', teams: ['sa', 'es', 'cv', 'uy'] },
    { name: 'Group I', teams: ['fr', 'sn', 'iq', 'no'] },
    { name: 'Group J', teams: ['ar', 'dz', 'at', 'jo'] },
    { name: 'Group K', teams: ['pt', 'uz', 'co', 'cd'] },
    { name: 'Group L', teams: ['gh', 'gb-eng', 'pa', 'hr'] },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-6">🏆 Group Standings</h2>
      {loading ? (
        <div className="bg-gradient-to-br from-green-950/80 via-blue-950/80 to-red-950/80 backdrop-blur-lg rounded-2xl p-6 border border-yellow-500/30 shadow-xl">
          <p className="text-white text-center">Loading standings from ESPN API...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {groups.map((group) => {
            const groupTeams = teamStats.filter(team => group.teams.includes(team.id))
            // Sort by points (wins * 3 + ties), then by goal difference
            const sortedTeams = [...groupTeams].sort((a, b) => {
              const pointsA = a.wins * 3 + a.ties
              const pointsB = b.wins * 3 + b.ties
              if (pointsB !== pointsA) return pointsB - pointsA
              const gdA = a.pointsFor - a.pointsAgainst
              const gdB = b.pointsFor - b.pointsAgainst
              return gdB - gdA
            })

            return (
              <div key={group.name} className="bg-gradient-to-br from-green-950/80 via-blue-950/80 to-red-950/80 backdrop-blur-lg rounded-2xl p-6 border border-yellow-500/30 shadow-xl">
                <h3 className="text-xl font-bold text-yellow-400 mb-4 whitespace-nowrap">{group.name}</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2 px-2 text-gray-300 font-semibold w-8">#</th>
                      <th className="text-left py-2 px-2 text-gray-300 font-semibold w-40">Team</th>
                      <th className="text-center py-2 px-2 text-gray-300 font-semibold w-10">P</th>
                      <th className="text-center py-2 px-2 text-gray-300 font-semibold w-10">W</th>
                      <th className="text-center py-2 px-2 text-gray-300 font-semibold w-10">D</th>
                      <th className="text-center py-2 px-2 text-gray-300 font-semibold w-10">L</th>
                      <th className="text-center py-2 px-2 text-gray-300 font-semibold w-10">GF</th>
                      <th className="text-center py-2 px-2 text-gray-300 font-semibold w-10">GA</th>
                      <th className="text-center py-2 px-2 text-gray-300 font-semibold w-10">GD</th>
                      <th className="text-center py-2 px-2 text-gray-300 font-semibold w-10">Pts</th>
                      <th className="text-center py-2 px-2 text-gray-300 font-semibold w-32">Last 3</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedTeams.map((team, index) => {
                      const points = team.wins * 3 + team.ties
                      const goalDiff = team.pointsFor - team.pointsAgainst
                      return (
                        <tr key={team.id} className={`border-b border-gray-800 hover:bg-gray-800/50 transition-colors ${index < 2 ? 'bg-green-500/10' : ''}`}>
                          <td className="py-2 px-2 text-white font-bold w-8">{index + 1}</td>
                          <td className="py-2 px-2 text-white font-medium whitespace-nowrap w-40">
                            {team.name}
                          </td>
                          <td className="py-2 px-2 text-center text-gray-300 w-10">{team.gamesPlayed}</td>
                          <td className="py-2 px-2 text-center text-green-400 font-bold w-10">{team.wins}</td>
                          <td className="py-2 px-2 text-center text-blue-400 font-bold w-10">{team.ties}</td>
                          <td className="py-2 px-2 text-center text-red-400 font-bold w-10">{team.losses}</td>
                          <td className="py-2 px-2 text-center text-gray-300 w-10">{team.pointsFor}</td>
                          <td className="py-2 px-2 text-center text-gray-300 w-10">{team.pointsAgainst}</td>
                          <td className="py-2 px-2 text-center text-gray-300 w-10">{goalDiff > 0 ? `+${goalDiff}` : goalDiff}</td>
                          <td className="py-2 px-2 text-center text-yellow-400 font-bold w-10">{points}</td>
                          <td className="py-2 px-2 w-32">
                            <div className="flex gap-1 justify-center">
                              {team.last5Games.map((result: string, idx: number) => (
                                <div
                                  key={idx}
                                  className={`w-5 h-5 rounded-full ${
                                    result === 'win'
                                      ? 'bg-green-500'
                                      : result === 'tie'
                                      ? 'bg-blue-500'
                                      : 'bg-red-500'
                                  }`}
                                  title={result === 'win' ? 'Win' : result === 'tie' ? 'Tie' : 'Loss'}
                                />
                              ))}
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                <div className="mt-3 text-xs text-gray-400">
                  <span className="text-green-400">● Top 2 advance</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function FifaWorldCup() {
  const [games] = useState<Game[]>(sampleGames)
  const [predictions, setPredictions] = useState<Map<string, UserPrediction>>(new Map())
  const currentDate = new Date('2026-06-10T00:00:00')
  const [selectedDate, setSelectedDate] = useState(new Date('2026-06-11T12:00:00'))
  const [userPoints, setUserPoints] = useState(0)
  const [showRules, setShowRules] = useState(false)
  const [wagerAmount, setWagerAmount] = useState<Map<string, number>>(new Map())
  const [activeTab, setActiveTab] = useState<TabType>('predictions')

  // Check if a game is available for prediction (day before until game start)
  const isGameAvailableForPrediction = (game: Game): boolean => {
    const now = currentDate
    const gameDate = game.date
    
    // Predictions don't open until June 10, 2026 at 12:00 AM EST
    const tournamentStart = new Date('2026-06-10T00:00:00')
    if (now < tournamentStart) {
      return false
    }
    
    // Block all games on June 11, 2026
    const june11 = new Date('2026-06-11T00:00:00')
    const june12 = new Date('2026-06-12T00:00:00')
    if (gameDate >= june11 && gameDate < june12) {
      return false
    }
    
    // Calculate the day before the game
    const dayBefore = new Date(gameDate)
    dayBefore.setDate(dayBefore.getDate() - 1)
    dayBefore.setHours(0, 0, 0, 0)
    
    // Available from day before at 00:00 until game start
    return now >= dayBefore && now < gameDate && game.status === 'upcoming'
  }

  // Check if predictions are open for a specific date
  const getAvailableGamesForDate = (date: Date): Game[] => {
    return games.filter(game => {
      const gameDate = new Date(game.date)
      gameDate.setHours(0, 0, 0, 0)
      
      const checkDate = new Date(date)
      checkDate.setHours(0, 0, 0, 0)
      
      // Show games on the selected date
      return gameDate.getTime() === checkDate.getTime()
    })
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
    
    const newPrediction: UserPrediction = {
      gameId,
      prediction,
      timestamp: new Date(),
      wager: wager > 0 ? wager : undefined
    }
    
    const newPredictions = new Map(predictions)
    newPredictions.set(gameId, newPrediction)
    setPredictions(newPredictions)
    
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
    
    // Save to localStorage
    localStorage.setItem('fifaPredictions', JSON.stringify(Array.from(newPredictions.entries())))
  }

  // Load predictions from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('fifaPredictions')
    if (saved) {
      const parsed = JSON.parse(saved)
      setPredictions(new Map(parsed))
    }
  }, [])

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
    }) + ' EST'
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
                <p className="text-sm text-blue-300 font-medium">Tournament Prediction Challenge built by Bilal Iqbal</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/50 rounded-lg px-4 py-2">
                <span className="text-sm text-yellow-200">Your Points:</span>
                <span className="text-2xl font-bold text-yellow-400">{userPoints}</span>
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
        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab('predictions')}
            className={`px-6 py-3 rounded-lg font-bold transition-all ${
              activeTab === 'predictions'
                ? 'bg-gradient-to-r from-green-500 via-blue-500 to-red-500 text-white shadow-lg'
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700'
            }`}
          >
            📅 Predictions
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-6 py-3 rounded-lg font-bold transition-all ${
              activeTab === 'stats'
                ? 'bg-gradient-to-r from-green-500 via-blue-500 to-red-500 text-white shadow-lg'
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700'
            }`}
          >
            📊 Stats
          </button>
          <button
            onClick={() => setActiveTab('standings')}
            className={`px-6 py-3 rounded-lg font-bold transition-all ${
              activeTab === 'standings'
                ? 'bg-gradient-to-r from-green-500 via-blue-500 to-red-500 text-white shadow-lg'
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700'
            }`}
          >
            🏆 Standings
          </button>
        </div>

        {activeTab === 'predictions' && (
          <>
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
                    className={`bg-gradient-to-br from-green-950/80 via-blue-950/80 to-red-950/80 backdrop-blur-lg rounded-2xl p-6 border-2 transition-all shadow-xl ${
                      existingPrediction ? 'border-yellow-500/50 shadow-yellow-500/20' : 'border-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
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
                          src={`https://flagcdn.com/w80/${game.homeTeam.id}.png`} 
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
                          src={`https://flagcdn.com/w80/${game.awayTeam.id}.png`} 
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
                        className={`bg-gradient-to-r from-green-950/80 via-blue-950/80 to-red-950/80 rounded-xl p-4 border transition-all ${
                          existingPrediction ? 'border-yellow-500/50' : 'border-gray-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <img 
                              src={`https://flagcdn.com/w40/${game.homeTeam.id}.png`} 
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
                              src={`https://flagcdn.com/w40/${game.awayTeam.id}.png`} 
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
          </>
        )}

        {activeTab === 'stats' && (
          <StatsSection />
        )}

        {activeTab === 'standings' && (
          <StandingsSection />
        )}
      </main>
    </div>
  )
}



