import { Riddle } from '../../../models/RiddlesResponse'
import { $fetch, FetchError } from 'ohmyfetch'

const config = useRuntimeConfig()

export default defineEventHandler(async (): Promise<Riddle[]> => {
  try {
    const riddles = await $fetch<Riddle[]>(config.apiBase + "/riddles")

    if (riddles === null) {
      throw createError({ statusCode: 500, message: "Failed to get riddles"})
    }

    riddles.forEach(r => {
      console.log(new Date(r.effective))
      console.log(new Date())

      if(new Date(r.effective) < new Date()) {
        r.isAvailable = true
      } else {
        r.isAvailable = false
      }
    })

    return riddles
  } catch(er) {
    throw createError({ statusCode: 500, message: "Failed to get riddles"})
  }
})
