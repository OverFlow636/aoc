let map = require('fs').readFileSync('./input3.txt').toString().trim().split("\n");

const symbolMap = map.reduce((ret, line, row) => {
    for(let i = 0; i<line.length; i++) {
        if ("*#-+@%&=$/".includes(line[i])) {
            if (!ret[row]) {
                ret[row] = {
                    cols: [],
                    syms: []
                };
            }
            ret[row].cols.push(i);
            ret[row].syms.push(line[i]);
        }
    }
    return ret;
}, {});

const numberMap = map.reduce((ret, line, row) => {
    let buffer = '';
    let indexes = [];
    let doingNumber = false;
    for(let i=0;i<line.length;i++) {

        if (line.charAt(i) >= '0' && line.charAt(i) <= '9') {
            // found a digit
            doingNumber = true;
            indexes.push(i);
            buffer += line[i];
        } else {
            if (doingNumber) {
                // finalize number logic
                if (!ret[row]) {
                    ret[row] = [];
                }

                ret[row].push({
                    indexes,
                    number: parseInt(buffer)
                });

                // reset for next num
                buffer = '';
                indexes = [];
                doingNumber = false;
            }
        }
    }
    return ret;
}, {});

let part1 = 0;
let part2 = 0;

Object.keys(symbolMap).forEach((row) => {
    if (symbolMap[row]) {
        symbolMap[row].cols.forEach((col, index) => {
            const isGear = symbolMap[row].syms[index] === '*';
            const checkCols = [
                col > 1 ? col - 1 : 0, 
                col, 
                col < map[0].length - 1 ? col + 1 : map.length - 1
            ].filter((v, i, a) => !a.includes(v, i+1));
            const checkRows = [
                row > 1 ? row - 1 : 0, 
                row, 
                row < map.length - 1 ? parseInt(row) + 1 : map.length - 1
            ].filter((v, i, a) => !a.includes(v, i+1));
            let gearNums = [];

            // for each row, check if any digit in cols position is a digit
            checkRows.forEach((row) => {
                if (numberMap[row]) {
                    numberMap[row].forEach((num) => {
                        if (intersect(num.indexes, checkCols).length) {
                            part1 += num.number;

                            if (isGear) {
                                gearNums.push(num.number);
                            }
                        }
                    });
                }
            });

            // finalize part 2
            if (isGear && gearNums.length === 2) { 
                part2 += gearNums[0] * gearNums[1];
            }
        });
    }
});

console.log('part1: ' + part1);
console.log('part2: ' + part2);

function intersect(a, b) {
    var setA = new Set(a);
    var setB = new Set(b);
    var intersection = new Set([...setA].filter(x => setB.has(x)));
    return Array.from(intersection);
}
