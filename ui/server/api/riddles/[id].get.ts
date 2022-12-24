import { Riddle } from '../../../models/RiddlesResponse'
import { marked } from 'marked'

export default defineEventHandler(async (event): Promise<Riddle> => {
  const id = event.context.params.id

  const riddles: Riddle[] = [
    {
      id: 1,
      riddle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.",
      story: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      answer: "foo",
      effectiveDate: new Date("12/22/2022 00:00:00"),
      expirationDate: new Date("12/23/2022 00:00:00"),
      isSolved: true
    },
    {
      id: 2,
      riddle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.",
      story: "Lorem **ipsum** dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      answer: "foo",
      effectiveDate: new Date("12/23/2022 00:00:00"),
      expirationDate: new Date("12/24/2022 00:00:00"),
      isSolved: false
    },
    {
      id: 3,
      riddle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.",
      story: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      answer: "foo",
      effectiveDate: new Date("12/24/2022 00:00:00"),
      expirationDate: new Date("12/25/2022 00:00:00"),
      isSolved: false
    }
  ]

  const riddle = riddles.filter(r => r.id == id)[0]

  riddle.story = marked.parse(riddle.story)

  if(riddle.effectiveDate < new Date()) {
    riddle.isAvailable = true
  } else {
    riddle.isAvailable = false
  }

  return riddle
})

