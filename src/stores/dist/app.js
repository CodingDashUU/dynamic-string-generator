"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.useGeneratorStore = void 0;
var pinia_1 = require("pinia");
var vue_1 = require("vue");
function randomArrayValue(array) {
    var randomBytes = new Uint32Array(1);
    crypto.getRandomValues(randomBytes);
    return array[randomBytes[0] % array.length];
}
function randomValue(num) {
    var randomBytes = new Uint32Array(1);
    return crypto.getRandomValues(randomBytes)[0] % num;
}
function randomArrayValues(array, length) {
    var randomBytes = new Uint32Array(length);
    crypto.getRandomValues(randomBytes);
    return Array.from(randomBytes).map(function (_, index) { return array[randomBytes[index] % array.length]; });
}
function fisherYatesShuffle(array) {
    var _a;
    var shuffled = __spreadArrays(array);
    for (var i = shuffled.length - 1; i > 0; i--) {
        // Pick random index from 0 to i (inclusive)
        var randomIndex = randomValue(i + 1);
        // Swap
        _a = [shuffled[randomIndex], shuffled[i]], shuffled[i] = _a[0], shuffled[randomIndex] = _a[1];
    }
    return shuffled;
}
exports.useGeneratorStore = pinia_1.defineStore('generator', {
    state: function () { return ({
        stringAmount: vue_1.ref(1),
        stringLength: vue_1.ref(16),
        generatedStrings: vue_1.ref([]),
        lowerCaseLength: vue_1.ref(4),
        upperCaseLength: vue_1.ref(4),
        numberLength: vue_1.ref(4),
        symbolLength: vue_1.ref(4),
        lowercaseSelected: vue_1.ref([]),
        uppercaseSelected: vue_1.ref([]),
        numbersSelected: vue_1.ref([]),
        symbolsSelected: vue_1.ref([]),
        chars: [
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=', '{', '[', '}', ']', '|', ':', ';', '?', '/', '>', '<', '.', ',', '~',
        ],
        charConst: vue_1.ref([
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=', '{', '[', '}', ']', '|', ':', ';', '?', '/', '>', '<', '.', ',', '~',
        ]),
        charsSeparated: {
            lowercase: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
            uppercase: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
            numbers: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
            symbols: ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=', '{', '[', '}', ']', '|', ':', ';', '?', '/', '>', '<', '.', ',', '~']
        },
        charsSeparatedConst: {
            lowercase: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
            uppercase: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
            numbers: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
            symbols: ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=', '{', '[', '}', ']', '|', ':', ';', '?', '/', '>', '<', '.', ',', '~']
        }
    }); },
    actions: {
        generateSimple: function () {
            this.generatedStrings = [];
            while (this.generatedStrings.length < this.stringAmount) {
                var tempString = '';
                while (tempString.length < this.stringLength) {
                    tempString += randomArrayValue(this.chars);
                }
                this.generatedStrings.push(tempString);
            }
        },
        generateSimpleUnique: function () {
            this.generatedStrings = [];
            while (this.generatedStrings.length < this.stringAmount) {
                var tempString = '';
                while (tempString.length < this.stringLength) {
                    var randomValue_1 = randomArrayValue(this.chars);
                    if (!tempString.includes(randomValue_1)) {
                        tempString += randomValue_1;
                    }
                }
                this.generatedStrings.push(tempString);
            }
        },
        generateDynamic: function () {
            this.generatedStrings = [];
            while (this.generatedStrings.length < this.stringAmount) {
                var charPool = __spreadArrays(randomArrayValues(this.charsSeparated.lowercase, this.lowerCaseLength), randomArrayValues(this.charsSeparated.uppercase, this.upperCaseLength), randomArrayValues(this.charsSeparated.numbers, this.numberLength), randomArrayValues(this.charsSeparated.symbols, this.symbolLength));
                var tempString = '';
                for (var _i = 0, _a = fisherYatesShuffle(charPool); _i < _a.length; _i++) {
                    var element = _a[_i];
                    tempString += element;
                }
                this.generatedStrings.push(tempString);
            }
        },
        generateDynamicUnique: function () {
            this.generatedStrings = [];
            while (this.generatedStrings.length < this.stringAmount) {
                // We use fisher yates method because when it shuffles the character set, there will never be any repeating characters!
                var charPool = __spreadArrays(fisherYatesShuffle(this.charsSeparated.lowercase).slice(0, this.lowerCaseLength), fisherYatesShuffle(this.charsSeparated.uppercase).slice(0, this.upperCaseLength), fisherYatesShuffle(this.charsSeparated.numbers).slice(0, this.numberLength), fisherYatesShuffle(this.charsSeparated.symbols).slice(0, this.symbolLength));
                var tempString = '';
                for (var _i = 0, _a = fisherYatesShuffle(charPool); _i < _a.length; _i++) {
                    var element = _a[_i];
                    tempString += element;
                }
                this.generatedStrings.push(tempString);
            }
        }
    }
});
