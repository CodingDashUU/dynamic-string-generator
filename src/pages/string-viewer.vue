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
  async function copyAllStringsAsBlobs () {
    const allStrings = stringsSelected.value.join('\n')
    await navigator.clipboard.writeText(allStrings)
  }
</script>

<template>
  <h1>STRING VIEWER</h1>
  <v-data-table v-model="stringsSelected" item-value="value" :items="store.generatedStrings.map((value, index) => { return { index: index+1, value: value } })" show-select />
  <div style=" margin: 0 auto;">
    <v-row>
      <v-col cols="12" md="6" xs="12">
        <v-tooltip location="bottom" text="Each string will be copied individually, one by one. This is great for convenience and with a small amount of strings being generated.">
          <template #activator="{ props }">
            <v-btn style="width: 100vw" v-bind="props" @click="copyAllStrings">Copy Selected Strings as a queue</v-btn>
          </template>
        </v-tooltip>
      </v-col>
      <v-col cols="12" md="6" xs="12">
        <v-tooltip location="bottom" text="All strings will be copied once into 1 big blob. This is great for copying multiple strings at once without losing speed.">
          <template #activator="{ props }">
            <v-btn style="width: 100vw" v-bind="props" @click="copyAllStringsAsBlobs">Copy Selected Strings as a blob</v-btn>
          </template>
        </v-tooltip>
      </v-col>
      <v-col />

    </v-row>
  </div>
</template>
