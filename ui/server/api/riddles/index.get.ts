import { Riddle } from '../../../models/RiddlesResponse'
import { $fetch } from 'ohmyfetch'

const config = useRuntimeConfig()

export default defineEventHandler(async (): Promise<Riddle[]> => {
  const riddles = await $fetch<Riddle[]>(config.apiBase + "/riddles")

  if (riddles === null) {
    throw createError({ statusCode: 500, message: "Failed to get riddles"})
  }


  riddles.forEach(r => {
    const currentDate = new Date()
    currentDate.setHours(currentDate.getHours() - 5)

    console.log("Effective date renders as:")
    console.log(new Date(r.effective))

    console.log("current date renders as:")
    console.log(currentDate)

    if(new Date(r.effective) < currentDate) {
      r.isAvailable = true
    } else {
      r.isAvailable = false
    }
  })

  return riddles
})
