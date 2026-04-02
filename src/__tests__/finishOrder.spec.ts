import { describe, it, expect } from 'vitest'

import type { Horse } from '@/types'
import { finishOrder } from '@/utils/race/finishOrder'

function horse(id: string, condition: number): Horse {
  return { id, name: id, color: '#000', colorName: 'Red', condition }
}

describe('finishOrder', () => {
  it('orders by weighted score using the rng stream', () => {
    const rng = (() => {
      let i = 0
      const seq = [0.1, 0.9, 0.2, 0.8, 0.3, 0.7, 0.4, 0.6, 0.5, 0.55]
      return () => seq[i++] ?? 0.5
    })()
    const field = [
      horse('a', 50),
      horse('b', 80),
      horse('c', 20),
      horse('d', 90),
      horse('e', 40),
      horse('f', 60),
      horse('g', 70),
      horse('h', 55),
      horse('i', 65),
      horse('j', 75),
    ]
    const out = finishOrder(field, rng)
    expect(out).toHaveLength(field.length)
    expect(new Set(out.map((h) => h.id)).size).toBe(field.length)
  })
})
