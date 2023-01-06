<template>
  <ContainerNarrow class="pt-20">
    <div v-if="timer.hours > 0" class="flex items-center space-x-3">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 text-gray-500">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p class="text-3xl text-gray-700 font-bold">{{ timer.hours }}:{{ timer.minutes }}:{{ timer.seconds }}</p>
    </div>
    <h1 class="mt-5 text-2xl font-medium text-gray-700">{{ riddle?.title }}</h1>
    <div class="mt-4 text-gray-600 prose max-w-none" v-html="riddle?.story"></div>
    <p v-if="!riddle?.isSolved" class="mt-12 text-gray-600">{{ riddle?.riddle }}</p>

    <div v-if="riddle?.isSolved" class="mt-6 flex items-center space-x-2">
      <p class="font-bold text-gray-700">You solved this riddle, here's your gold star:</p>
      <span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-yellow-500">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      </span>
    </div>
    <div v-else-if="!riddle?.isSolved && timer.hours < 24">
      <div class="mt-6 sm:flex items-end sm:space-x-2">
        <div class="w-full sm:flex sm:space-x-2">
          <div class="w-full">
            <label for="answer" class="block text-sm font-medium text-gray-700">Answer</label>
            <div class="mt-1">
              <input v-model="answer" type="text" name="answer" id="answer" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 transition-hover-300" placeholder="Super smart answer">
            </div>
          </div>
          <div class="mt-2 sm:mt-0 w-full">
            <label v-if="apiKey === ''" for="api-key" class="block text-sm font-medium text-gray-700">API Key</label>
            <label v-else for="api-key" class="block text-sm font-medium text-gray-700">API Key (we cached it)</label>
            <div class="relative mt-1">
              <input v-model="apiKey" :type="apiKeyInputShow" name="api-key" id="api-key" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 transition-hover-300" placeholder="Super smart answer">
              <button v-if="apiKeyInputShow === 'password'" @click="apiKeyInputShow = 'text'" class="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-500 hover:text-gray-900 transition-hover-300">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <button v-if="apiKeyInputShow === 'text'" @click="apiKeyInputShow = 'password'" class="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-500 hover:text-gray-900 transition-hover-300">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <SubmitButton @submit="submitAnswer()" class="mt-4 sm:mt-0" submit-text="Submit" color="teal" size="lg" :is-valid-state="!answerIsError && answer !== '' && apiKey !== ''" :submit-loading="answerIsLoading" />
      </div>

      <div v-if="answerIsCorrect" class="mt-4 rounded-md bg-green-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-green-800">Correct</h3>
            <div class="mt-2 text-sm text-green-700">
              <p>Congrats, you answered today's riddle correctly!</p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="answerIsCorrect === false" class="mt-4 rounded-md bg-red-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <!-- Heroicon name: mini/x-circle -->
            <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Incorrect answer, dumbass</h3>
          </div>
        </div>
      </div>

      <div v-if="answerIsError" class="mt-4 rounded-md bg-red-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <!-- Heroicon name: mini/x-circle -->
            <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">An error occured when submitting the request. Did you provide the correct API key?</h3>
          </div>
        </div>
      </div>


    </div>
    <div v-else class="mt-6 flex items-center space-x-2">
      <span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
      </span>
      <p class="font-bold text-gray-700">Hey not so fast, you're not on this day yet</p>
    </div>

    <SuccessModal v-if="answerIsCorrect" title="Riddle solved!" :message="riddle?.solvedText!" button-text="Go home" />

  </ContainerNarrow>
</template>

<script setup lang="ts">
import { Riddle } from '../models/RiddlesResponse'
import { RiddleAnswer } from '../models/RiddlesAnswerResponse'
import { differenceInSeconds } from 'date-fns'

const route = useRoute()
const riddleId = route.params.id

const { data: riddle, error:riddleError , refresh: refetchRiddle } = await useFetch<Riddle>('/api/riddles/' + riddleId)

if(!riddle.value?.isAvailable) {
  navigateTo("/")
}

if(riddleError.value) {
  alert("Whoops, something went wrong when getting that riddle")
  navigateTo("/")
}

// TIMER
const secondsUntilExpiry = ref<number>()
if(riddle.value) {
  secondsUntilExpiry.value = differenceInSeconds(new Date(riddle.value.expiration), new Date)
}

const timer = useTimer(secondsUntilExpiry.value!)


// SUBMIT ANSWER
const answer = ref<string>('')
const apiKey = useCookie('apiKey')
const apiKeyInputShow = ref("password")

const answerIsCorrect = ref<boolean | null>(null)
const answerIsLoading = ref(false)
const answerIsError = ref(false)

const submitAnswer = async () => {
  answerIsLoading.value = true
  const { data: answerRes, error:answerError} = await useFetch<RiddleAnswer>("/api/riddles/answers/" + riddleId, {
    method: "PUT",
    body: {
      answer: answer.value
    },
    headers: useRequestHeaders(['cookie']) as Record<string,string>
  })

  if(answerError.value) {
    answerIsError.value = true 
    answerIsLoading.value = false
    return
  }

  if(answerRes.value?.success) {
    answerIsCorrect.value = true
    answerIsLoading.value = false
    refetchRiddle()
  } else {
    answerIsCorrect.value = false
    answerIsLoading.value = false
  }
}

</script>
