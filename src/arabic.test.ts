import {assertStrictEquals, assertThrows} from './test_deps.ts';
import {toArabic} from './arabic.ts';

const inputs = [ 'I', 'IV', 'VIII', 'XV', 'XVI', 'XXIII', 'XLII', 'LXXXIV',
  'C', 'CCLVI', 'DXII', 'MXXIV', 'MMXLVIII', 'MMMCMXCIX' ];
const inputsLowercase = inputs.map(str => str.toLowerCase());
const expectedValues = [ 1, 4, 8, 15, 16, 23, 42, 84, 100, 256, 512, 1024, 2048, 3999 ];
const invalidInputTypes = [ 42, {}, [], function () {} ];
const invalidInputs = [ 'foo', 'bar', 'foobar', 'red', 'MMORPG', 'CCCC' ];

const tests: Deno.TestDefinition[] = [
  {
    name: 'Works with string literals',
    fn: () => {
      for (const [index, str] of inputs.entries()) {
        assertStrictEquals(toArabic(str), expectedValues[index]);
      }
    },
  },
  {
    name: 'Works with lowercase strings',
    fn: () => {
      for (const [index, str] of inputsLowercase.entries()) {
        assertStrictEquals(toArabic(str), expectedValues[index]);
      }
    },
  },
  {
    name: 'Throws on non-string inputs',
    fn: () => {
      for (const value of invalidInputTypes) {
        assertThrows(() => {
          // deno-lint-ignore ban-ts-comment
          // @ts-ignore
          toArabic(value);
        }, TypeError);
      }
    },
  },
  {
    name: 'Throws on invalid strings',
    fn: () => {
      for (const str of invalidInputs) {
        assertThrows(() => {
          toArabic(str);
        }, Error);
      }
    },
  },
  {
    name: 'Works with a "nulla"',
    fn: () => {
      assertStrictEquals(toArabic('nulla'), 0);
      assertStrictEquals(toArabic('nuLLa'), 0);
    },
  },
  {
    name: 'Works with an empty string',
    fn: () => {
      assertStrictEquals(toArabic(''), 0);
    },
  },
];

for (const t of tests) Deno.test(t);
