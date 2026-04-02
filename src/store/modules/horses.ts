import type { ActionContext, Module } from 'vuex'

import type { RootState } from '@/store/types'
import type { HorsesState } from '@/store/modules/horses/types'
import type { Horse } from '@/types'
import { generateHorses } from '@/utils/horses'

export type { HorsesState } from '@/store/modules/horses/types'

export const horsesModule: Module<HorsesState, RootState> = {
  namespaced: true,

  state: (): HorsesState => ({
    horses: [],
  }),

  getters: {
    all: (state: HorsesState): Horse[] => state.horses,
    count: (state: HorsesState): number => state.horses.length,
  },

  mutations: {
    SET_HORSES(state: HorsesState, horses: Horse[]) {
      state.horses = horses
    },
  },

  actions: {
    initialize({ commit }: ActionContext<HorsesState, RootState>) {
      commit('SET_HORSES', generateHorses())
    },
  },
}
