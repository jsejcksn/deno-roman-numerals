# roman-numerals


## Use

```ts
import { toArabic, toRoman } from "https://deno.land/x/roman_numerals/mod.ts";

console.log(toArabic("XLII")); // 42
console.log(toArabic("xlii")); // 42
console.log(toRoman(42)); // "XLII"
console.log(toRoman("42")); // "XLII"
```


## Notes

> This module started as a port of the npm package [roman-numerals](https://github.com/joshleaves/roman-numerals) (see [ACKNOWLEDGEMENTS.md](./ACKNOWLEDGEMENTS.md)). The API is the same (with the notable exception that non-primitives are not accepted as arguments).

The provided functions convert between [roman numerals](https://en.wikipedia.org/wiki/Roman_numerals) and [arabic integers](https://en.wikipedia.org/wiki/Arabic_numerals). The conversions utilize the "standard form" of roman numerals, so only values from `0` to `3999` (inclusive) are valid. Any values outside this range will throw an error.


## Exports

### `toArabic`

```ts
function toArabic(roman: string): number
```

Converts a valid roman number to its arabic equivalent.

In addition to roman numerals in range, acceptable strings are also `"nulla"` and `""` (an empty string) which will both return 0.

### `toRoman`

```ts
function toRoman(arabic: number | string): string
```

Converts an arabic number (0 to 3999 inclusive) to its roman equivalent.

The function will attempt to parse string integers. It will throw a TypeError on non-number inputs or `NaN`.


## Tests

```
deno test
```
