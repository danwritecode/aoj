import { RiddleAnswer } from '../../../../models/RiddlesAnswerResponse'
import { $fetch } from 'ohmyfetch'
import { zh, z } from 'h3-zod';

const config = useRuntimeConfig()

export default defineEventHandler(async (event): Promise<RiddleAnswer> => {
  const cookies = parseCookies(event)
  const apiKey = cookies.apiKey

  const id = event.context.params.id

  const body = await zh.useValidatedBody(event, z.object({
    answer: z.string()
  }))

  const answerRes = await $fetch<RiddleAnswer>(config.apiBase + "/riddles/answers/" + id, {
    method: "PUT",
    body: {
      answer: body.answer
    },
    headers: {
      "x-api-key": apiKey
    }
  })

  return answerRes
})
