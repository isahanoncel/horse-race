export async function playFrames(
  durationMs: number,
  onTick: (t: number) => void,
  isPaused?: () => boolean,
): Promise<void> {
  onTick(0)
  const paused = isPaused ?? (() => false)
  const t0 = performance.now()
  let pauseStarted: number | null = null
  let totalPaused = 0

  return new Promise((resolve) => {
    const step = (now: number) => {
      if (paused()) {
        if (pauseStarted === null) pauseStarted = now
        requestAnimationFrame(step)
        return
      }
      if (pauseStarted !== null) {
        totalPaused += now - pauseStarted
        pauseStarted = null
      }
      const elapsed = now - t0 - totalPaused
      const t = Math.min(1, elapsed / durationMs)
      onTick(t)
      if (t < 1) {
        requestAnimationFrame(step)
      } else {
        resolve()
      }
    }
    requestAnimationFrame(step)
  })
}
