/** Generate the roman number for the current power of tenth */
function upToTen(num: number, one: string, five: string, ten: string): string {
  let value = "";
  switch (num) {
    case 0:
      return value;
    case 9:
      return one + ten;
    case 4:
      return one + five;
  }
  if (num >= 5) value = five, num -= 5;
  while (num-- > 0) value += one;
  return value;
}

/**
 * Converts an arabic number (0 to 3999 inclusive) to its roman equivalent.
 *
 * The function will attempt to parse string integers. It will throw a TypeError
 * on non-number inputs or NaN, and will thow a RangeError if the argument
 * provided is less than 0 or greater than 3999.
 *
 * @param arabic - Integer
 * @returns Roman numeral
 */
export function toRoman(arabic: number | string): string {
  let number: number;
  if (typeof arabic === "string") {
    number = parseInt(arabic, 10);
    if (isNaN(number)) throw new TypeError("toRoman expects a number");
  } else if (typeof arabic !== "number" || isNaN(arabic)) {
    throw new TypeError("toRoman expects a number");
  } else number = arabic;

  // Handling out-of-range numbers: negative numbers, numbers over 3999,...
  if (number < 0) {
    throw new RangeError("toRoman cannot express negative numbers");
  }
  if (number > 3999) {
    throw new RangeError("toRoman cannot express numbers greater than 3999");
  }

  // Zero is/was a special case. I'll go with Dionysius Exiguus on this one as
  // seen on http://en.wikipedia.org/wiki/Roman_numerals#Zero
  if (number === 0) return "nulla";
  let roman = "";

  // Chomping away by the power of tenths
  roman += upToTen(Math.floor(number / 1000), "M", "", "");
  number %= 1000;
  roman += upToTen(Math.floor(number / 100), "C", "D", "M");
  number %= 100;
  roman += upToTen(Math.floor(number / 10), "X", "L", "C");
  number %= 10;
  roman += upToTen(number, "I", "V", "X");
  return roman;
}
