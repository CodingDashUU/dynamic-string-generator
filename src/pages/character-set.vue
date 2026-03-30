<script lang="ts" setup>
  import { watch } from 'vue'
  import { useGeneratorStore } from '@/stores/app'
  const store = useGeneratorStore()

  // What will be represented, because the original character set will be mutated!
  watch([() => store.lowercaseSelected, () => store.uppercaseSelected, () => store.numbersSelected, () => store.symbolsSelected], () => {
    store.chars = store.charConst.filter(i => !store.lowercaseSelected.includes(i)
      && !store.uppercaseSelected.includes(i)
      && !store.numbersSelected.includes(i)
      && !store.symbolsSelected.includes(i))
    store.charsSeparated.lowercase = store.charsSeparatedConst.lowercase.filter(i => !store.lowercaseSelected.includes(i))
    store.charsSeparated.uppercase = store.charsSeparatedConst.uppercase.filter(i => !store.uppercaseSelected.includes(i))
    store.charsSeparated.numbers = store.charsSeparatedConst.numbers.filter(i => !store.numbersSelected.includes(i))
    store.charsSeparated.symbols = store.charsSeparatedConst.symbols.filter(i => !store.symbolsSelected.includes(i))
  }, { immediate: true, deep: true })
</script>

<template>
  <h1>Select what characters to exclude</h1>
  <v-row>
    <v-col cols="12" md="6" xs="12">
      <v-data-table v-model="store.lowercaseSelected" item-value="lowercase" :items="store.charsSeparatedConst.lowercase.map((value, index) => { return { index: index+1, lowercase: value } })" show-select />
    </v-col>
    <v-col cols="12" md="6" xs="12">
      <v-data-table v-model="store.uppercaseSelected" item-value="uppercase" :items="store.charsSeparatedConst.uppercase.map((value, index) => { return { index: index+1, uppercase: value } })" show-select />
    </v-col>
    <v-col cols="12" md="6" xs="12">
      <v-data-table v-model="store.numbersSelected" item-value="numbers" :items="store.charsSeparatedConst.numbers.map((value, index) => { return { index: index+1, numbers: value } })" show-select />
    </v-col>
    <v-col cols="12" md="6" xs="12">
      <v-data-table v-model="store.symbolsSelected" item-value="symbols" :items="store.charsSeparatedConst.symbols.map((value, index) => { return { index: index+1, symbols: value } })" show-select />
    </v-col>
  </v-row>

</template>
