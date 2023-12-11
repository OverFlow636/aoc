let input = require('fs').readFileSync('./input11.txt').toString().trim().split("\n");

if (1) {
input = `
...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....
`.trim().split("\n");
}

const expandRows = [];
input.forEach((line, row) => {
    if (line.indexOf('#') === -1) {
        expandRows.push(row);
    }
});

const expandCols = [];
for(let col=0; col<input[0].length; col++) {
    let hasGalaxy = false;
    for(let row=0;row<input.length;row++) {
        if (input[row][col] === '#') {
            hasGalaxy = true;
            break;
        }
    }
    if (!hasGalaxy) {
        expandCols.push(col);
    }
}

let galaxies = [];
input.forEach((line, row) => {
    for(let col=0; col<line.length; col++) {
        if (line[col] === '#') {
            galaxies.push({row, col});
        }
    }
});

let pairs = [];
galaxies.forEach((g, current) => {
    if (current < galaxies.length -1) {
        for(let i=current+1; i < galaxies.length; i++) {
            pairs.push(getDistance(g, galaxies[i]));
        }
    }
});

console.log('sum: ', pairs.reduce((ret, p) => ret + p, 0))

function getDistance(a, b, expansionValue=9) {
    let expands = 0;
    const down = b.row - a.row;

    for(let i=b.row; i > a.row; i--) {
        if (expandRows.includes(i)) {
            expands++;
        }
    }

    if (b.col > a.col) {
        for(let i=b.col; i > a.col; i--) {
            if (expandCols.includes(i)) {
                expands++;
            }
        }
    } else {
        for(let i=b.col; i < a.col; i++) {
            if (expandCols.includes(i)) {
                expands++;
            }
        }
    }

    const side = Math.abs(b.col - a.col);
    return down+side + (expands * expansionValue);
}
