<!-- eslint-disable vue/no-side-effects-in-computed-properties -->
<script lang="ts" setup>
  import { computed, type Ref, ref } from 'vue'
  import { useGeneratorStore } from '@/stores/app.ts'
  const store = useGeneratorStore()
  const allowRepeatingCharacters: Ref<boolean> = ref(true)
  const maxStringLength = computed(() => {
    if (store.chars.length === 0) {
      store.stringLength = 0
      return 0
    }
    if (allowRepeatingCharacters.value) {
      return 99
    }
    if (store.stringLength > store.chars.length) {
      store.stringLength = store.chars.length
    }
    return store.chars.length
  })
</script>

<template>
  <div class="page">
    <h1>Simple String Generator</h1>
    <v-form @submit.prevent="() => allowRepeatingCharacters ? store.generateSimple() : store.generateSimpleUnique()">
      <v-number-input
        v-model="store.stringAmount"
        control-variant="stacked"
        :hide-input="false"
        :inset="false"
        label="Amount of strings to generate"
        :max="99"
        :min="0"
        :reverse="false"
        variant="outlined"
      />
      <v-number-input
        v-model="store.stringLength"
        control-variant="stacked"
        :hide-input="false"
        :inset="false"
        label="Length of each string"

        :max="maxStringLength"
        :min="0"
        :reverse="false"
        variant="outlined"
      />
      <v-switch
        v-model="allowRepeatingCharacters"
        color="primary"
        label="Allow repeating characters"
      />
      <v-btn
        block
        class="mt-2"
        text="Generate"
        type="submit"
      />
    </v-form>
  </div>
</template>
