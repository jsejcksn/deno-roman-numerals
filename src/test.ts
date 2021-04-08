import {assertStrictEquals} from './test_deps.ts';
import {toArabic, toRoman} from '../mod.ts';

const tests: Deno.TestDefinition[] = [
  {
    name: 'toArabic is a function',
    fn: () => {
      assertStrictEquals(typeof toArabic, 'function');
    },
  },
  {
    name: 'toRoman is a function',
    fn: () => {
      assertStrictEquals(typeof toRoman, 'function');
    },
  },
  {
    name: 'Bidirectional equality of return values',
    fn: () => {
      for (let i = 0; i < 4000; i += 1) {
        assertStrictEquals(toArabic(toRoman(i)), i);
      }
    },
  },
];

for (const t of tests) Deno.test(t);
