export interface Genre {
  name: string
  minBPM: number
  maxBPM: number
  color: string
}

export const GENRES: Genre[] = [
  { name: 'Ballad', minBPM: 60, maxBPM: 80, color: '#8B5CF6' },
  { name: 'Pop', minBPM: 80, maxBPM: 100, color: '#06B6D4' },
  { name: 'Rock', minBPM: 100, maxBPM: 120, color: '#EF4444' },
  { name: 'House', minBPM: 120, maxBPM: 130, color: '#F59E0B' },
  { name: 'Techno', minBPM: 130, maxBPM: 150, color: '#10B981' },
  { name: 'D&B', minBPM: 150, maxBPM: 180, color: '#EC4899' },
  { name: 'Hardcore', minBPM: 180, maxBPM: 200, color: '#DC2626' },
]

export function getMatchingGenres(bpm: number): Genre[] {
  return GENRES.filter((genre) => bpm >= genre.minBPM && bpm <= genre.maxBPM)
}

export function getPrimaryGenre(bpm: number): Genre | null {
  const matches = getMatchingGenres(bpm)
  return matches.length > 0 ? matches[0] : null
}
