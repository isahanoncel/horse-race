import { createStore } from 'vuex'

import type { RootState } from '@/store/types'
import { horsesModule } from '@/store/modules/horses'
import { raceModule } from '@/store/modules/race'

export const store = createStore<RootState>({
  modules: {
    horses: horsesModule,
    race: raceModule,
  },
})

export type AppStore = typeof store
