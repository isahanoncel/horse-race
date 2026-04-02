import { describe, it, expect } from 'vitest'

import { HORSES_PER_ROUND, ROUND_COUNT, ROUND_DISTANCES_M } from '@/constants'
import { generateHorses } from '@/utils/horses/generateHorses'
import { buildSchedule } from '@/utils/schedule/buildSchedule'

describe('buildSchedule', () => {
  it('builds six rounds with required distances and field size', () => {
    const rng = (() => {
      let n = 0.1003
      return () => {
        n = (n * 9301 + 49297) % 233280
        return n / 233280
      }
    })()
    const pool = generateHorses()
    const plan = buildSchedule(pool, rng)
    expect(plan).toHaveLength(ROUND_COUNT)
    plan.forEach((round, i) => {
      expect(round.distanceM).toBe(ROUND_DISTANCES_M[i])
      expect(round.horses).toHaveLength(HORSES_PER_ROUND)
      const ids = new Set(round.horses.map((h) => h.id))
      expect(ids.size).toBe(HORSES_PER_ROUND)
    })
  })
})
