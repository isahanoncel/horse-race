export function framePositions(t: number, orderIds: string[]): Record<string, number> {
  const rank = new Map(orderIds.map((id, i) => [id, i]))
  const out: Record<string, number> = {}
  for (const id of orderIds) {
    const r = rank.get(id) ?? 0
    const d = r * 0.072
    if (t <= d) {
      out[id] = 0
    } else {
      const denom = Math.max(0.08, 1 - d)
      out[id] = Math.min(1, (t - d) / denom)
    }
  }
  return out
}
