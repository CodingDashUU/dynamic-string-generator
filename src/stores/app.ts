import { defineStore } from 'pinia'
import { type Ref, ref } from 'vue'

function randomArrayValue (array: string[]): string {
  const randomBytes = new Uint32Array(1)
  crypto.getRandomValues(randomBytes)
  return array[randomBytes[0] % array.length]
}
function randomValue (num: number): number {
  const randomBytes = new Uint32Array(1)
  return crypto.getRandomValues(randomBytes)[0] % num
}

function randomArrayValues (array: string[], length: number): string[] {
  const randomBytes = new Uint32Array(length)
  crypto.getRandomValues(randomBytes)
  return Array.from(randomBytes).map((_, index) => array[randomBytes[index] % array.length])
}
function fisherYatesShuffle (array: string[]): string[] {
  const shuffled = [...array]

  for (let i = shuffled.length - 1; i > 0; i--) {
    // Pick random index from 0 to i (inclusive)
    const randomIndex: number = randomValue(i + 1) as number

    // Swap
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]]
  }

  return shuffled
}
export const useGeneratorStore = defineStore('generator', {
  state: () => ({
    stringAmount: ref(1) as Ref<number>,
    stringLength: ref(16) as Ref<number>,
    generatedStrings: ref([]) as Ref<Array<string>>,

    lowerCaseLength: ref(4) as Ref<number>,
    upperCaseLength: ref(4) as Ref<number>,
    numberLength: ref(4) as Ref<number>,
    symbolLength: ref(4) as Ref<number>,

    lowercaseSelected: ref([]) as Ref<string[]>,
    uppercaseSelected: ref([]) as Ref<string[]>,
    numbersSelected: ref([]) as Ref<string[]>,
    symbolsSelected: ref([]) as Ref<string[]>,

    chars: [
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
      '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=', '{', '[', '}', ']', '|', ':', ';', '?', '/', '>', '<', '.', ',', '~',
    ],
    charConst: ref([
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
      '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=', '{', '[', '}', ']', '|', ':', ';', '?', '/', '>', '<', '.', ',', '~',
    ]),
    charsSeparated: {
      lowercase: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
      uppercase: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      numbers: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      symbols: ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=', '{', '[', '}', ']', '|', ':', ';', '?', '/', '>', '<', '.', ',', '~'],
    },
    charsSeparatedConst: {
      lowercase: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
      uppercase: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      numbers: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      symbols: ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=', '{', '[', '}', ']', '|', ':', ';', '?', '/', '>', '<', '.', ',', '~'],
    },
  }),
  actions: {
    generateSimple () {
      this.generatedStrings = []
      while (this.generatedStrings.length < this.stringAmount) {
        let tempString = ''
        while (tempString.length < this.stringLength) {
          tempString += randomArrayValue(this.chars)
        }
        this.generatedStrings.push(tempString)
      }
    },
    generateSimpleUnique () {
      this.generatedStrings = []
      while (this.generatedStrings.length < this.stringAmount) {
        let tempString = ''
        const charPool = fisherYatesShuffle(this.chars).slice(0, this.stringLength)
        for (const element of fisherYatesShuffle(charPool)) {
          tempString += element
        }
        this.generatedStrings.push(tempString)
      }
    },
    generateDynamic () {
      this.generatedStrings = []
      while (this.generatedStrings.length < this.stringAmount) {
        const charPool = [
          ...randomArrayValues(this.charsSeparated.lowercase, this.lowerCaseLength),
          ...randomArrayValues(this.charsSeparated.uppercase, this.upperCaseLength),
          ...randomArrayValues(this.charsSeparated.numbers, this.numberLength),
          ...randomArrayValues(this.charsSeparated.symbols, this.symbolLength),
        ]
        let tempString = ''
        for (const element of fisherYatesShuffle(charPool)) {
          tempString += element
        }
        this.generatedStrings.push(tempString)
      }
    },
    generateDynamicUnique () {
      this.generatedStrings = []
      while (this.generatedStrings.length < this.stringAmount) {
        // We use fisher yates method because when it shuffles the character set, there will never be any repeating characters!
        const charPool = [
          ...fisherYatesShuffle(this.charsSeparated.lowercase).slice(0, this.lowerCaseLength),
          ...fisherYatesShuffle(this.charsSeparated.uppercase).slice(0, this.upperCaseLength),
          ...fisherYatesShuffle(this.charsSeparated.numbers).slice(0, this.numberLength),
          ...fisherYatesShuffle(this.charsSeparated.symbols).slice(0, this.symbolLength),
        ]
        let tempString = ''
        for (const element of fisherYatesShuffle(charPool)) {
          tempString += element
        }
        this.generatedStrings.push(tempString)
      }
    },
  },
})
