<template>
  <ContainerNarrow class="pt-20">
    <div class="flex items-center space-x-3">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 text-gray-500">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p class="text-3xl text-gray-700 font-bold">{{ timer.hours }}:{{ timer.minutes }}:{{ timer.seconds }}</p>
    </div>
    <h1 class="mt-5 text-2xl font-medium text-gray-700">{{ riddle?.title }}</h1>
    <div class="mt-4 text-gray-600" v-html="riddle?.story"></div>
    <p class="mt-12 text-gray-600">{{ riddle?.riddle }}</p>

    <div v-if="riddle?.isSolved" class="mt-6 flex items-center space-x-2">
      <p class="font-bold text-gray-700">You solved this riddle, here's your gold star:</p>
      <span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-yellow-500">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      </span>
    </div>
    <div v-else-if="!riddle?.isSolved && timer.hours < 24">
      <div class="mt-6 flex items-end space-x-2">
        <div class="sm:w-1/2">
          <label for="answer" class="block text-sm font-medium text-gray-700">Answer</label>
          <div class="mt-1">
            <input type="text" name="answer" id="answer" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 transition-hover-300" placeholder="Super smart answer">
          </div>
        </div>
        <SubmitButton submit-text="Submit" color="teal" size="lg" :is-valid-state="true" :submit-loading="false" />
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

  </ContainerNarrow>
</template>

<script setup lang="ts">
import { Riddle } from '../models/RiddlesResponse'
import { differenceInSeconds } from 'date-fns'
import { Timer } from '../composables/useTimer'

const route = useRoute()
const riddleId = route.params.id

const { data: riddle, error:riddleError } = await useFetch<Riddle>('/api/riddles/' + riddleId)

if(!riddle.value?.isAvailable) {
  navigateTo("/")
}

// TIMER
const secondsUntilExpiry = ref<number>()
if(riddle.value) {
  secondsUntilExpiry.value = differenceInSeconds(new Date(riddle.value.expirationDate), new Date)
}

const timer = useTimer(secondsUntilExpiry.value!)


// SUBMIT ANSWER

</script>
