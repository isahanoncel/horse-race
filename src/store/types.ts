import type { HorsesState } from '@/store/modules/horses/types'
import type { RaceState } from '@/store/modules/race/types'

export type RootState = {
  horses: HorsesState
  race: RaceState
}
