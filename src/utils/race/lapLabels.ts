export function programLapLabel(roundIndex: number, distanceM: number): string {
  const n = roundIndex + 1
  return `${n}ST Lap - ${distanceM}m`
}

export function trackLapCaption(roundIndex: number, distanceM: number): string {
  const n = roundIndex + 1
  return `${n}.st Lap ${distanceM}m`
}
