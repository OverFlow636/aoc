let input = require('fs').readFileSync('./input10.txt').toString().trim().split("\n");

if (1) {    
 input = `
.|........|.
.|S------7|.
.||F----7||.
.|||....|||.
.|||....|||.
.||L-7F-J||.
.||..||..||.
.|L--JL--J|.
.|........|.`.trim().split("\n");
}

if (0) {
    console.log('adj: ', getAdjTiles({row:3, col:10}))
    process.exit();
}

// find s
let s;
input.forEach((line, i) => {
    if (line.indexOf('S') > -1) {
        s = {
            row: i, 
            col: line.indexOf('S')
        };
    }
});

console.log('s: ', s)

// from s, start exploring by marking every direction with step count
// till we find no more locations

let adj = getAdjTiles(s).filter((a) => !!getAdjTiles(a.pos).find(d => d.char === 'S'));
console.log('starting options: ',adj);

console.log('')
console.log('')
console.log('')

let last = {pos: s};
let next = adj[0];
let step = [next];
do {
    //process.stdout.write(next.char);
    let newNext = getAdjTiles(next.pos, last.pos);

    if (!newNext) {
        console.log()
        console.log('err', next)
        process.exit(-1);
    }
    //console.log('step: ' + step + ' taking ' + next.char + ' to ' + newNext);
    last = next;
    next = newNext;
    //console.log('last:', last)
    //console.log('next:', next)
    step.push(next);



} while (next.char !== 'S');

console.log()
console.log('took ' + step.length + ' steps')

const charMap = {
    'L': "└",
    'J': "┘",
    '|': "│",
    '-': "─",
    'F': "┌",
    '7': "┐",
};

console.log(input[0].length);

input.forEach((line, row) => {
    line = line.trim();
    const steps = step.filter(s => s.pos.row === row);
    let startBlock = false;
    let bCount = 0;
    let confirmCount = 0;

    let lastKnownCol = -1;
    for(let i=0; i<line.length; i++) {
        if (steps.find(s => s.pos.col === i)) {
            lastKnownCol = i;

            //process.stdout.write(['|','-'].includes(line[i]) ? '█' : '░');
            process.stdout.write(charMap[line[i]] ?? 'S');
            //process.stdout.write(line[i]);

            if (startBlock) {
                // two blocks next to eachother, dont need to care
                if (bCount) {
                    // add all temp to confirmed blocked
                    confirmCount += bCount;
                    bCount = 0;
                }
            } else {
                startBlock = true;
            }
            
        } else {
            process.stdout.write(startBlock ? 'X' : '.');
            //process.stdout.write(line[i]);
            if (startBlock) {
                bCount++;
            }
        }
    }
    //process.stdout.write("  " + line.length)
    

    let removeLast = lastKnownCol - line.length + 1;

    if (lastKnownCol < line.length-1) {
        //process.stdout.write(' ' + removeLast)
        process.stdout.moveCursor(removeLast, 0);
        for(let x=0;x<Math.abs(removeLast);x++) {
            process.stdout.write('.')
        }
    }

    process.stdout.write("\n");
})

process.exit();








function getAdjTiles(pos, prev) {
    let N,S,E,W = false;
    /*| is a vertical pipe connecting north and south.
    - is a horizontal pipe connecting east and west.
    L is a 90-degree bend connecting north and east.
    J is a 90-degree bend connecting north and west.
    7 is a 90-degree bend connecting south and west.
    F is a 90-degree bend connecting south and east.*/
    const char = input[pos.row][pos.col];
    switch(char) {
        case 'S': N = S = E = W = true; break;
        case '|': S = N = true; break;
        case '-': E = W = true; break;
        case 'L': N = E = true; break;
        case 'J': N = W = true; break;
        case '7': S = W = true; break;
        case 'F': S = E = true; break;
    }

    let tiles = [];

    if (N &&  pos.row - 1 > -1 && input[pos.row-1][pos.col] !== '.') {
        tiles.push({
            direction: 'N', 
            char: input[pos.row-1][pos.col],
            pos: {row: pos.row-1, col: pos.col}
        });
    }

    if (S &&  pos.row + 1 < input.length && input[pos.row+1][pos.col] !== '.') {
        tiles.push({
            direction: 'S', 
            char: input[pos.row+1][pos.col],
            pos: {row: pos.row+1, col: pos.col}
        });
    }

    if (E && pos.col+1 < input[pos.row].length && input[pos.row][ pos.col+1 ] !== '.') {
        tiles.push({
            direction: 'E', 
            char: input[pos.row][ pos.col+1 ],
            pos: {row: pos.row, col: pos.col+1}
        });
    }

    if (W && pos.col -1 > -1 && input[pos.row][pos.col-1] !== '.') {
        tiles.push({
            direction: 'W', 
            char: input[pos.row][pos.col-1],
            pos: {row: pos.row, col: pos.col-1}
        });
    }    

    if (prev) {
        let ret = tiles.filter((tile) => !(tile.pos.row == prev.row && tile.pos.col == prev.col));
        if (ret.length > 1) {
            console.log('too many options', tiles);
            process.exit(-1);
        }
        return ret.length ? ret[0]: null;
    }
    
    return tiles;
}


