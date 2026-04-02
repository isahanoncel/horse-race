import { describe, it, expect } from 'vitest'

import { framePositions } from '@/utils/race/framePositions'

describe('framePositions', () => {
  it('starts at zero and reaches one for the full order', () => {
    const order = ['a', 'b', 'c']
    const p0 = framePositions(0, order)
    expect(p0['a']).toBe(0)
    expect(p0['b']).toBe(0)
    expect(p0['c']).toBe(0)
    const p1 = framePositions(1, order)
    expect(p1['a']).toBeGreaterThan(0.9)
    expect(p1['b']).toBeGreaterThan(0.9)
    expect(p1['c']).toBeGreaterThan(0.9)
  })
})
