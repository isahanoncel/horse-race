import { describe, it, expect } from 'vitest'

import { HORSE_POOL_SIZE } from '@/constants'
import { generateHorses } from '@/utils/horses/generateHorses'

describe('generateHorses', () => {
  it('fills the pool with distinct colors and valid condition', () => {
    const list = generateHorses()
    expect(list).toHaveLength(HORSE_POOL_SIZE)
    const colors = new Set(list.map((h) => h.color))
    expect(colors.size).toBe(HORSE_POOL_SIZE)
    for (const h of list) {
      expect(h.condition).toBeGreaterThanOrEqual(1)
      expect(h.condition).toBeLessThanOrEqual(100)
      expect(h.id).toBeTruthy()
      expect(h.name).toBeTruthy()
      expect(h.colorName).toBeTruthy()
    }
  })
})
