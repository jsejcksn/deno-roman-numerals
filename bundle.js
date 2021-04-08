function upToTen(num, one, five, ten) {
    let value = '';
    switch(num){
        case 0:
            return value;
        case 9:
            return one + ten;
        case 4:
            return one + five;
    }
    if (num >= 5) value = five, num -= 5;
    while((num--) > 0)value += one;
    return value;
}
function toRoman1(arabic) {
    let number;
    if (typeof arabic === 'string') {
        number = parseInt(arabic, 10);
        if (isNaN(number)) throw new TypeError('toRoman expects a number');
    } else if (typeof arabic !== 'number' || isNaN(arabic)) {
        throw new TypeError('toRoman expects a number');
    } else number = arabic;
    if (number < 0) throw new RangeError('toRoman cannot express negative numbers');
    if (number > 3999) throw new RangeError('toRoman cannot express numbers greater than 3999');
    if (number === 0) return 'nulla';
    let roman = '';
    roman += upToTen(Math.floor(number / 1000), 'M', '', '');
    number %= 1000;
    roman += upToTen(Math.floor(number / 100), 'C', 'D', 'M');
    number %= 100;
    roman += upToTen(Math.floor(number / 10), 'X', 'L', 'C');
    number %= 10;
    roman += upToTen(number, 'I', 'V', 'X');
    return roman;
}
function toArabic1(roman) {
    if (typeof roman !== 'string') throw new TypeError('toArabic expects a string');
    if (/^nulla$/i.test(roman) || !roman.length) return 0;
    const match = roman.toUpperCase().match(/^(M{0,3})(CM|DC{0,3}|CD|C{0,3})(XC|LX{0,3}|XL|X{0,3})(IX|VI{0,3}|IV|I{0,3})$/);
    if (!match) throw new Error('toArabic expects a valid roman number');
    let arabic = 0;
    arabic += match[1].length * 1000;
    if (match[2] === 'CM') arabic += 900;
    else if (match[2] === 'CD') arabic += 400;
    else arabic += match[2].length * 100 + (match[2][0] === 'D' ? 400 : 0);
    if (match[3] === 'XC') arabic += 90;
    else if (match[3] === 'XL') arabic += 40;
    else arabic += match[3].length * 10 + (match[3][0] === 'L' ? 40 : 0);
    if (match[4] === 'IX') arabic += 9;
    else if (match[4] === 'IV') arabic += 4;
    else arabic += match[4].length * 1 + (match[4][0] === 'V' ? 4 : 0);
    return arabic;
}
export { toRoman1 as toRoman };
export { toArabic1 as toArabic };
