import type { RoundResult, ScheduledRound } from '@/types'

export type RaceState = {
  schedule: ScheduledRound[] | null
  running: boolean
  paused: boolean
  activeRound: number | null
  laneProgress: Record<string, number>
  results: RoundResult[]
}
