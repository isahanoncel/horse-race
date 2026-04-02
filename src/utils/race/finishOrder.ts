import type { Horse } from '@/types'

export function finishOrder(participants: Horse[], rng: () => number): Horse[] {
  const scored = participants.map((h) => ({
    h,
    s: h.condition * (0.72 + rng() * 0.55),
  }))
  scored.sort((a, b) => b.s - a.s)
  return scored.map((x) => x.h)
}
