// Tournament Types and Interfaces

export type ScreenType = 'welcome' | 'tournament' | 'error' | 'ceremony'

export interface Player {
  id: string
  username: string
  betTeamId?: string
  betTeamName?: string
  points: number
}

export interface Team {
  id: string
  name: string
  flag: string
}

export const WORLD_CUP_TEAMS: Team[] = [
  { id: 'dz', name: 'Algeria', flag: '��' },
  { id: 'ar', name: 'Argentina', flag: '🇷' },
  { id: 'au', name: 'Australia', flag: '��' },
  { id: 'at', name: 'Austria', flag: '��' },
  { id: 'ba', name: 'Bosnia and Herzegovina', flag: '�🇦' },
  { id: 'br', name: 'Brazil', flag: '🇧�' },
  { id: 'ca', name: 'Canada', flag: '��' },
  { id: 'cv', name: 'Cabo Verde', flag: '��' },
  { id: 'ci', name: 'Côte d\'Ivoire', flag: '��' },
  { id: 'cd', name: 'Congo DR', flag: '�🇩' },
  { id: 'co', name: 'Colombia', flag: '��' },
  { id: 'cw', name: 'Curaçao', flag: '��' },
  { id: 'cz', name: 'Czechia', flag: '��' },
  { id: 'ec', name: 'Ecuador', flag: '��' },
  { id: 'eg', name: 'Egypt', flag: '��' },
  { id: 'gb-eng', name: 'England', flag: '�󠁧󠁢󠁥󠁮󠁧󠁿' },
  { id: 'fr', name: 'France', flag: '��' },
  { id: 'de', name: 'Germany', flag: '��' },
  { id: 'gh', name: 'Ghana', flag: '��' },
  { id: 'ht', name: 'Haiti', flag: '��' },
  { id: 'ir', name: 'IR Iran', flag: '��' },
  { id: 'iq', name: 'Iraq', flag: '��' },
  { id: 'jo', name: 'Jordan', flag: '��' },
  { id: 'jp', name: 'Japan', flag: '��' },
  { id: 'kr', name: 'Korea Republic', flag: '��' },
  { id: 'ma', name: 'Morocco', flag: '��' },
  { id: 'mx', name: 'Mexico', flag: '��' },
  { id: 'nl', name: 'Netherlands', flag: '��' },
  { id: 'nz', name: 'New Zealand', flag: '��' },
  { id: 'no', name: 'Norway', flag: '🇳🴴' },
  { id: 'pa', name: 'Panama', flag: '��' },
  { id: 'py', name: 'Paraguay', flag: '��' },
  { id: 'pt', name: 'Portugal', flag: '��' },
  { id: 'qa', name: 'Qatar', flag: '��' },
  { id: 'sa', name: 'Saudi Arabia', flag: '��' },
  { id: 'gb-sct', name: 'Scotland', flag: '�󠁧󠁢󠁳󠁣󠁴󠁿' },
  { id: 'sn', name: 'Senegal', flag: '��' },
  { id: 'es', name: 'Spain', flag: '��' },
  { id: 'se', name: 'Sweden', flag: '��' },
  { id: 'ch', name: 'Switzerland', flag: '��' },
  { id: 'tn', name: 'Tunisia', flag: '��' },
  { id: 'tr', name: 'Türkiye', flag: '��' },
  { id: 'us', name: 'USA', flag: '🇺�' },
  { id: 'uy', name: 'Uruguay', flag: '��' },
  { id: 'uz', name: 'Uzbekistan', flag: '��' },
  { id: 'za', name: 'South Africa', flag: '��' },
  { id: 'hr', name: 'Croatia', flag: '��' },
  { id: 'be', name: 'Belgium', flag: '��' },
]
