let input = require('fs').readFileSync('./input14.txt').toString().trim().split("\n").map(d => d.split(""));

if (0) {
    input = `
O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....
`.trim().split("\n").map(d => d.split(""));
}

function rotate(direction) {
    let moves = 0;
    do {
        moves = 0;
        for(let row=0; row<input.length; row++) {
            for(col=0; col<input[row].length; col++) {
                switch(direction) {
                    case 'N':
                        if (row > 0 && input[row][col] === 'O' && input[row-1][col] === '.') {
                            input[row-1][col] = 'O';
                            input[row][col] = '.';
                            moves++;
                        }
                    break;

                    case 'E':
                        if (col < input[row].length-1 && input[row][col] === 'O' && input[row][col+1] === '.') {
                            input[row][col+1] = 'O';
                            input[row][col] = '.';
                            moves++;
                        }
                    break;
                    
                    case 'W':
                        if (col > 0 && input[row][col] === 'O' && input[row][col-1] === '.') {
                            input[row][col-1] = 'O';
                            input[row][col] = '.';
                            moves++;
                        }
                    break;

                    case 'S':
                        if (row < input.length-1 && input[row][col] === 'O' && input[row+1][col] === '.') {
                            input[row+1][col] = 'O';
                            input[row][col] = '.';
                            moves++;
                        }
                        break;

                }
            }
        }
    } while(moves > 0);
}

function cycle() {
    rotate('N')
    rotate('W')
    rotate('S')
    rotate('E')
}

for(let i=0; i<1000; i++) {
    cycle();
}

let score = 0;
for(let row=0; row<input.length; row++) {
    for(col=0; col<input[row].length; col++) {
        if (input[row][col] === 'O') {
            score += input.length - row;
        }
    }
}
console.log('score ', score)