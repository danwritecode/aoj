export type Riddle = {
  id: number,
  riddle: string,
  title: string,
  story: string,
  answer: string,
  effective: Date,
  expiration: Date,
  isSolved: boolean
  isAvailable: boolean
}
