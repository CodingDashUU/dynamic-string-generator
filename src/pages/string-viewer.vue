<script lang="ts" setup>
  import { ref } from 'vue'
  import { useGeneratorStore } from '@/stores/app'
  const store = useGeneratorStore()
  const stringsSelected = ref([])

  async function copyAllStrings () {
    for (const element of stringsSelected.value) {
      await navigator.clipboard.writeText(element)
      await new Promise(resolve => setTimeout(resolve, 300))
    }
  }
</script>

<template>
  <h1>STRING VIEWER</h1>
  <v-data-table v-model="stringsSelected" item-value="value" :items="store.generatedStrings.map((value, index) => { return { index: index+1, value: value } })" show-select />
  <div style="text-align: center; margin: 0 auto;">
    <v-btn style="width: 100vw" @click="copyAllStrings">Copy Selected Strings</v-btn>
  </div>
</template>
