let input = require('fs').readFileSync('./input13.txt').toString().trim().split("\n\n").map((i) => i.trim().split("\n").map(i => i.trim()));

if (0) {
    input = `
.##..#.##
.##.####.
####.....
.##...##.
.##.#.###
#####..##
.##.#.##.
....#.###
####.####
#..###..#
.#..#####
#..#.#...
.....##..
#####.###
#####.###
`.trim().split("\n\n").map((i) => i.trim().split("\n"));
}


const part1 = input.reduce((ret, map) => {

    console.log(map);
    let h =checkH(map);    
    let v = checkV(map);
    console.log('h='+ h + ' v=' + v + "\n");

    if (v === 0 && h === 0) {
        console.log('err?')
        process.exit();
    }

    return ret + (v * 100) + h;

    //process.exit();    

}, 0);
console.log('part1: ' + part1)


function checkV(map, add=0) {
    if (map.length == 1) {
        return 0;
    }
    //console.log('checkV', map)

    for(let row=0; row<map.length -1; row++) {
        if (map[row] !== map[map.length-1-row]) {
            const first = checkV(map.slice(1), add + 1);
            const second = checkV(map.slice(0, map.length -1), 0);
            return first > second ? first : second;
        }
    }
    return (map.length / 2) + add;
}

function checkH(map, add=0) {
    //console.log('checkH', map)

    // check each column for its mirror
    const maxCol = map[0].length - 1;
    for(let col=0; col<maxCol / 2; col++) {
        let mirror = map.every((row) =>  row[col] === row[maxCol - col]);
        if (!mirror) {

            const first = checkH(map.map((line) => line.slice(1)), add + 1);
            const second = checkH(map.map((line) => line.slice(0, line.length-1)), 0);
            if (first > second) {
                return first;
            }
            return second;
        }
    }
    return map[0].length/2 + add;
}