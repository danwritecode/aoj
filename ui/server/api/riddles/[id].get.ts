import { Riddle } from '../../../models/RiddlesResponse'
import { $fetch, FetchError } from 'ohmyfetch'
import { marked } from 'marked'

const config = useRuntimeConfig()

export default defineEventHandler(async (event): Promise<Riddle> => {
  const id = event.context.params.id

  const riddle = await $fetch<Riddle>(config.apiBase + "/riddles/" + id)

  if (riddle === null) {
    throw createError({ statusCode: 500, message: "Failed to get riddle"})
  }
  
  const currentDate = new Date()
  currentDate.setHours(currentDate.getHours() - 5)

  if(new Date(riddle.effective) < currentDate) {
    riddle.isAvailable = true
  } else {
    riddle.isAvailable = false
  }

  riddle.story = marked(riddle.story)
  riddle.solvedText = marked(riddle.solvedText)
  riddle.riddle = marked(riddle.riddle)

  return riddle
})
