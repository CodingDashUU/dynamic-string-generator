<!-- eslint-disable vue/no-side-effects-in-computed-properties -->
<script lang="ts" setup>
  import { computed, type Ref, ref } from 'vue'
  import { useGeneratorStore } from '@/stores/app.ts'
  const store = useGeneratorStore()
  const allowRepeatingCharacters: Ref<boolean> = ref(true)
  const maxNumberLength = computed(() => {
    if (store.charsSeparated.numbers.length === 0) {
      store.numberLength = 0
      return 0
    }
    if (allowRepeatingCharacters.value) {
      return 99
    }
    if (store.numberLength > store.charsSeparated.numbers.length) {
      store.numberLength = store.charsSeparated.numbers.length
    }
    return store.charsSeparated.numbers.length
  })
  const maxLowercaseLength = computed(() => {
    if (store.charsSeparated.lowercase.length === 0) {
      store.lowerCaseLength = 0
      return 0
    }
    if (allowRepeatingCharacters.value) {
      return 99
    }
    if (store.lowerCaseLength > store.charsSeparated.lowercase.length) {
      store.lowerCaseLength = store.charsSeparated.lowercase.length
    }
    return store.charsSeparated.lowercase.length
  })
  const maxUppercaseLength = computed(() => {
    if (store.charsSeparated.uppercase.length === 0) {
      store.upperCaseLength = 0
      return 0
    }
    if (allowRepeatingCharacters.value) {
      return 99
    }
    if (store.upperCaseLength > store.charsSeparated.uppercase.length) {
      store.upperCaseLength = store.charsSeparated.uppercase.length
    }

    return store.charsSeparated.uppercase.length
  })
  const maxSymbolsLength = computed(() => {
    if (store.charsSeparated.symbols.length === 0) {
      store.symbolLength = 0
      return 0
    }
    if (allowRepeatingCharacters.value) {
      return 99
    }
    if (store.symbolLength > store.charsSeparated.symbols.length) {
      store.symbolLength = store.charsSeparated.symbols.length
    }

    return store.charsSeparated.symbols.length
  })
</script>

<template>
  <div class="page">
    <h1>Dynamic String Generator</h1>
    <v-form
      @submit.prevent="
        () =>
          allowRepeatingCharacters
            ? store.generateDynamic()
            : store.generateDynamicUnique()
      "
    >
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
        v-model="store.lowerCaseLength"
        control-variant="stacked"
        :hide-input="false"
        :inset="false"
        label="Amount of lowercase letters"
        :max="maxLowercaseLength"
        :min="0"
        :reverse="false"
        variant="outlined"
      />
      <v-number-input
        v-model="store.upperCaseLength"
        control-variant="stacked"
        :hide-input="false"
        :inset="false"
        label="Amount of uppercase letters"
        :max="maxUppercaseLength"
        :min="0"
        :reverse="false"
        variant="outlined"
      />
      <v-number-input
        v-model="store.numberLength"
        control-variant="stacked"
        :hide-input="false"
        :inset="false"
        label="Amount of numbers"
        :max="maxNumberLength"
        :min="0"
        :reverse="false"
        variant="outlined"
      />
      <v-number-input
        v-model="store.symbolLength"
        control-variant="stacked"
        :hide-input="false"
        :inset="false"
        label="Amount of symbols"
        :max="maxSymbolsLength"
        :min="0"
        :reverse="false"
        variant="outlined"
      />
      <v-switch v-model="allowRepeatingCharacters" color="primary" label="Allow repeating characters" />
      <h3>Total Length: {{ store.lowerCaseLength + store.upperCaseLength + store.numberLength + store.symbolLength }} characters</h3>
      <v-btn block class="mt-2" text="Generate" type="submit" />
    </v-form>
  </div>
</template>
