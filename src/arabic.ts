/**
 * Converts a roman number to its arabic equivalent.
 *
 * The function will throw a TypeError on non-string inputs.
 *
 * @param roman - Roman numeral
 * @returns Integer
 */
export function toArabic (roman: string): number {
  if (typeof roman !== 'string') throw new TypeError('toArabic expects a string');

  // Zero is/was a special case. I'll go with Dionysius Exiguus on this one as
  // seen on http://en.wikipedia.org/wiki/Roman_numerals#Zero
  if (/^nulla$/i.test(roman) || !roman.length) return 0;

  // Ultra magical regexp to validate roman numbers!
  const match = roman.toUpperCase().match(/^(M{0,3})(CM|DC{0,3}|CD|C{0,3})(XC|LX{0,3}|XL|X{0,3})(IX|VI{0,3}|IV|I{0,3})$/);
  if (!match) throw new Error('toArabic expects a valid roman number');
  let arabic = 0;

  // Crunching the thousands...
  arabic += match[1].length * 1000;

  // Crunching the hundreds...
  if (match[2] === 'CM') arabic += 900;
  else if (match[2] === 'CD') arabic += 400;
  else arabic += match[2].length * 100 + (match[2][0] === 'D' ? 400 : 0);


  // Crunching the tenths
  if (match[3] === 'XC') arabic += 90;
  else if (match[3] === 'XL') arabic += 40;
  else arabic += match[3].length * 10 + (match[3][0] === 'L' ? 40 : 0);

  // Crunching the...you see where I'm going, right?
  if (match[4] === 'IX') arabic += 9;
  else if (match[4] === 'IV') arabic += 4;
  else arabic += match[4].length * 1 + (match[4][0] === 'V' ? 4 : 0);
  return arabic;
}
