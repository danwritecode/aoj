<template>
  <ContainerNarrow class="pt-20">
    <h1 class="text-2xl font-medium text-gray-700">{{ riddle?.title }}</h1>
    <p class="mt-4 text-gray-600">{{ riddle?.riddle }}</p>
    <div class="mt-4 text-gray-600" v-html="riddle?.story"></div>
  </ContainerNarrow>
</template>

<script setup lang="ts">
import { Riddle } from '../models/RiddlesResponse'

const route = useRoute()
const riddleId = route.params.id

const { data: riddle, error:riddleError } = useFetch<Riddle>('/api/riddles/' + riddleId)
</script>
