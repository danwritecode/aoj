<template>
  <li class="grid grid-cols-10 gap-4">
    <div class="col-span-2 flex justify-center">
      <span v-if="riddle.isSolved" class="block">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-yellow-500">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      </span>
      <span v-else-if="isCurrentDay" class="block">{{ timer.hours }}:{{ timer.minutes }}:{{ timer.seconds }}</span>
      <span v-else class="block">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
      </span>
    </div> 
    <div class="col-span-8">
      <NuxtLink :to="'/' + riddle.id" class="text-gray-700 font-medium">{{ riddle.title }}</NuxtLink>
    </div> 
  </li>
</template>

<script setup lang="ts">
import { Riddle } from '../../models/RiddlesResponse'
import { differenceInSeconds } from 'date-fns'

type ListProps = {
  riddle: Riddle
}
const props = defineProps<ListProps>()
const isCurrentDay = computed(() => {
  if(timer.value.hours < 24) {
    return true
  }
  return false
})

const secondsUntilExpiry = differenceInSeconds(new Date(props.riddle.expirationDate), new Date)
const timer = useTimer(secondsUntilExpiry)
</script>
