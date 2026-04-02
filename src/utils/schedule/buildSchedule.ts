import { HORSES_PER_ROUND, ROUND_DISTANCES_M } from '@/constants'
import type { Horse, ScheduledRound } from '@/types'
import { sampleHorses } from '@/utils/schedule/sampleHorses'

export function buildSchedule(pool: Horse[], rng: () => number): ScheduledRound[] {
  return ROUND_DISTANCES_M.map((distanceM) => ({
    distanceM,
    horses: sampleHorses(pool, HORSES_PER_ROUND, rng),
  }))
}
