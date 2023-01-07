<template>
  <ContainerNarrow>
    <ClientOnly>
      <div class="flex items-center justify-center h-screen">
        <ol class="space-y-3">
          <RiddleListItem v-for="riddle in riddles" :key="riddle.id" :riddle="riddle" />
        </ol>
      </div>
    </ClientOnly>
  </ContainerNarrow>
</template>

<script setup lang="ts">

const { data:riddles, error: riddlesError} = await useFetch("/api/riddles")

</script>
