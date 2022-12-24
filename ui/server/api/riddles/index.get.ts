import { Riddle } from '../../../models/RiddlesResponse'

export default defineEventHandler(async (): Promise<Riddle[]> => {
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
      story: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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

  riddles.forEach(r => {
    if(r.effectiveDate < new Date()) {
      r.isAvailable = true
    } else {
      r.isAvailable = false
    }
  });

  return riddles;
})

