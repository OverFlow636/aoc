let string = require('fs').readFileSync('./input1.txt').toString().trim().split("\n");

function findFirstDigit(str, forward = true, part1 = true) {
    if (!part1) {
        str = str.replaceAll("oneight", forward ? '1' : '8');
        str = str.replaceAll("fiveight", forward ? '5' : '8');
        str = str.replaceAll("twone", forward ? '2' : '1');
        str = str.replaceAll("eightwo", forward ? '8' : '2');
        str = str.replaceAll("eighthree", forward ? '8' : '3');
        str = str.replaceAll("threeight", forward ? '3' : '8');
        str = str.replaceAll("nineight", forward ? '9' : '8');
        str = str.replaceAll("sevenine", forward ? '7' : '9');
        str = str.replaceAll("one", '1');
        str = str.replaceAll("two", '2');
        str = str.replaceAll("three", '3');
        str = str.replaceAll("four", '4');
        str = str.replaceAll("five", '5');
        str = str.replaceAll("six", '6');
        str = str.replaceAll("seven", '7');
        str = str.replaceAll("eight", '8');
        str = str.replaceAll("nine", '9');
    }

    for (let pos = forward ? 0 : str.length - 1; forward ? pos < str.length : pos >= 0; forward ? pos++ : pos--) {
        if (str.charCodeAt(pos) >= 48 && str.charCodeAt(pos) <= 57) {
            return str[pos];
        }
    }
}

const part1 = string.reduce((ret, line) =>
    ret += parseInt(findFirstDigit(line, true) + '' + findFirstDigit(line, false)), 0);

const part2 = string.reduce((ret, line) =>
    ret += parseInt(findFirstDigit(line, true, false) + '' + findFirstDigit(line, false, false)), 0);

console.log('part1: ' + part1);
console.log('part2: ' + part2);
