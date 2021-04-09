import { assertStrictEquals, assertThrows } from "./test_deps.ts";
import { toRoman } from "./roman.ts";

const inputs = [1, 4, 8, 15, 16, 23, 42, 84, 100, 256, 512, 1024, 2048, 3999];
const strings = inputs.map((n) => n.toString());
const expectedValues = [
  "I",
  "IV",
  "VIII",
  "XV",
  "XVI",
  "XXIII",
  "XLII",
  "LXXXIV",
  "C",
  "CCLVI",
  "DXII",
  "MXXIV",
  "MMXLVIII",
  "MMMCMXCIX",
];
const invalidInputTypes = [{}, [], "foo", function () {}];
const tooSmall = inputs.map((n) => n * -1);
const tooLarge = [4000, 4242];

const tests: Deno.TestDefinition[] = [
  {
    name: "Works with integers",
    fn: () => {
      for (const [index, number] of inputs.entries()) {
        assertStrictEquals(toRoman(number), expectedValues[index]);
      }
    },
  },
  {
    name: "Works with string integers",
    fn: () => {
      for (const [index, string] of strings.entries()) {
        assertStrictEquals(toRoman(string), expectedValues[index]);
      }
    },
  },
  {
    name: "Throws on non-number inputs",
    fn: () => {
      for (const value of invalidInputTypes) {
        assertThrows(() => {
          // deno-lint-ignore ban-ts-comment
          // @ts-ignore
          toRoman(value);
        }, TypeError);
      }
    },
  },
  {
    name: "Throws on NaN",
    fn: () => {
      assertThrows(() => {
        toRoman(NaN);
      }, TypeError);
    },
  },
  {
    name: "Throws on an empty string",
    fn: () => {
      assertThrows(() => {
        toRoman("");
      }, TypeError);
    },
  },
  {
    name: "Throws on negative numbers",
    fn: () => {
      for (const number of tooSmall) {
        assertThrows(() => {
          toRoman(number);
        }, RangeError);
      }
    },
  },
  {
    name: "Throws on numbers greater than 3999",
    fn: () => {
      for (const number of tooLarge) {
        assertThrows(() => {
          toRoman(number);
        }, RangeError);
      }
    },
  },
  {
    name: "Works with a 0",
    fn: () => {
      assertStrictEquals(toRoman(0), "nulla");
    },
  },
];

for (const t of tests) Deno.test(t);
