import { describe, it, expect } from 'vitest'

import { programLapLabel, trackLapCaption } from '@/utils/race/lapLabels'

describe('lapLabels', () => {
  it('formats program and track labels', () => {
    expect(programLapLabel(0, 1200)).toBe('1ST Lap - 1200m')
    expect(programLapLabel(1, 1400)).toBe('2ST Lap - 1400m')
    expect(trackLapCaption(0, 1200)).toBe('1.st Lap 1200m')
  })
})
