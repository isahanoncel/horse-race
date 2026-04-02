import type { Horse } from '@/types'

export function sampleHorses(pool: Horse[], count: number, rng: () => number): Horse[] {
  const copy = [...pool]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    const t = copy[i]!
    copy[i] = copy[j]!
    copy[j] = t
  }
  return copy.slice(0, count)
}
