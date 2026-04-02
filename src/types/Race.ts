import type { Horse } from './Horse'

export type ScheduledRound = {
  distanceM: number
  horses: Horse[]
}

export type ResultRow = {
  place: number
  horseId: string
  name: string
}

export type RoundResult = {
  round: number
  distanceM: number
  rows: ResultRow[]
}
