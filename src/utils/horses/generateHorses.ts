import { HORSE_COLOR_LABELS, HORSE_DISPLAY_NAMES } from '@/constants/horseNames'
import { HORSE_POOL_SIZE } from '@/constants'
import type { Horse } from '@/types'

export function generateHorses(): Horse[] {
  const horses: Horse[] = []

  for (let i = 0; i < HORSE_POOL_SIZE; i++) {
    const hue = Math.round((360 / HORSE_POOL_SIZE) * i)
    horses.push({
      id: `horse-${i + 1}`,
      name: HORSE_DISPLAY_NAMES[i] ?? `Runner ${i + 1}`,
      color: `hsl(${hue} 70% 45%)`,
      colorName: HORSE_COLOR_LABELS[i] ?? '—',
      condition: Math.floor(Math.random() * 100) + 1,
    })
  }

  return horses
}
