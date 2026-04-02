import { describe, it, expect, vi } from 'vitest'
import { createStore } from 'vuex'

vi.mock('@/utils/race/playFrames', () => ({
  playFrames: vi.fn(async (_ms: number, onTick: (t: number) => void) => {
    onTick(0)
    onTick(1)
  }),
}))

import type { RootState } from '@/store/types'
import { horsesModule } from '@/store/modules/horses'
import { raceModule } from '@/store/modules/race'
import { generateHorses } from '@/utils/horses/generateHorses'

function buildStore() {
  return createStore<RootState>({
    modules: {
      horses: horsesModule,
      race: raceModule,
    },
  })
}

describe('race flow', () => {
  it('generates a schedule then records six result blocks after start', async () => {
    const store = buildStore()
    store.commit('horses/SET_HORSES', generateHorses())
    store.dispatch('race/generate')
    expect(store.getters['race/hasSchedule']).toBe(true)
    expect(store.state.race.schedule?.length).toBe(6)
    await store.dispatch('race/start')
    expect(store.state.race.running).toBe(false)
    expect(store.state.race.results).toHaveLength(6)
    expect(store.state.race.results[0]?.rows.length).toBe(10)
  })
})
