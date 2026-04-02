import type { ActionContext, Module } from 'vuex'

import type { RootState } from '@/store/types'
import type { RaceState } from '@/store/modules/race/types'
import type { Horse, ResultRow, RoundResult } from '@/types'
import { buildSchedule } from '@/utils/schedule'
import { finishOrder, framePositions, playFrames } from '@/utils/race'

export type { RaceState } from '@/store/modules/race/types'

const emptyLane = (): Record<string, number> => ({})

export const raceModule: Module<RaceState, RootState> = {
  namespaced: true,

  state: (): RaceState => ({
    schedule: null,
    running: false,
    paused: false,
    activeRound: null,
    laneProgress: emptyLane(),
    results: [],
  }),

  getters: {
    hasSchedule: (s: RaceState) => Boolean(s.schedule?.length),
    orderedResults: (s: RaceState) => s.results,
  },

  mutations: {
    SET_SCHEDULE(state: RaceState, schedule: RaceState['schedule']) {
      state.schedule = schedule
    },
    SET_RUNNING(state: RaceState, v: boolean) {
      state.running = v
    },
    SET_PAUSED(state: RaceState, v: boolean) {
      state.paused = v
    },
    SET_ACTIVE_ROUND(state: RaceState, idx: number | null) {
      state.activeRound = idx
    },
    SET_LANES(state: RaceState, lanes: Record<string, number>) {
      state.laneProgress = { ...lanes }
    },
    CLEAR_LANES(state: RaceState) {
      state.laneProgress = emptyLane()
    },
    CLEAR_RESULTS(state: RaceState) {
      state.results = []
    },
    PUSH_RESULT(state: RaceState, row: RoundResult) {
      state.results = [...state.results, row]
    },
  },

  actions: {
    generate({ commit, rootGetters }: ActionContext<RaceState, RootState>) {
      const pool = rootGetters['horses/all'] as Horse[]
      if (!pool.length) return
      commit('CLEAR_RESULTS')
      commit('CLEAR_LANES')
      commit('SET_ACTIVE_ROUND', null)
      commit('SET_PAUSED', false)
      commit('SET_SCHEDULE', buildSchedule(pool, Math.random))
    },

    togglePause({ commit, state }: ActionContext<RaceState, RootState>) {
      if (!state.running) return
      commit('SET_PAUSED', !state.paused)
    },

    async start({ commit, state, rootState }: ActionContext<RaceState, RootState>) {
      if (!state.schedule?.length || state.running) return
      commit('CLEAR_RESULTS')
      commit('SET_PAUSED', false)
      commit('SET_RUNNING', true)
      try {
        let index = 0
        for (const round of state.schedule) {
          commit('SET_ACTIVE_ROUND', index)
          commit('CLEAR_LANES')
          const ranking = finishOrder(round.horses, Math.random)
          await playFrames(
            3200 + index * 120,
            (t) => {
              commit('SET_LANES', framePositions(t, ranking.map((h) => h.id)))
            },
            () => rootState.race.paused,
          )
          const rows: ResultRow[] = ranking.map((h, i) => ({
            place: i + 1,
            horseId: h.id,
            name: h.name,
          }))
          commit('PUSH_RESULT', {
            round: index + 1,
            distanceM: round.distanceM,
            rows,
          })
          index += 1
        }
      } finally {
        commit('SET_RUNNING', false)
        commit('SET_PAUSED', false)
        commit('SET_ACTIVE_ROUND', null)
        commit('CLEAR_LANES')
      }
    },
  },
}
