export type Riddle = {
  id: number
  riddle: string
  title: string
  story: string
  effective: Date
  expiration: Date
  isSolved: boolean
  isAvailable: boolean
  solvedText: string
}
