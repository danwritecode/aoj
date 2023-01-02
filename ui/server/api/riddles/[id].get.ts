import { Riddle } from '../../../models/RiddlesResponse'
import { $fetch, FetchError } from 'ohmyfetch'

const config = useRuntimeConfig()

export default defineEventHandler(async (event): Promise<Riddle> => {
  const id = event.context.params.id

  const riddle = await $fetch<Riddle>(config.apiBase + "/riddles/" + id)

  if (riddle === null) {
    throw createError({ statusCode: 500, message: "Failed to get riddle"})
  }
  
  if(new Date(riddle.effective) < new Date()) {
    riddle.isAvailable = true
  } else {
    riddle.isAvailable = false
  }

  return riddle
})
