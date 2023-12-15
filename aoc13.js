let input = require('fs').readFileSync('./input13.txt').toString().trim().split("\n\n").map((i) => i.trim().split("\n").map(i => i.trim()));

if (0) {
    input = `
.#.##.#.##..###
...##...#######
#.####.#.#.###.
#..##..##..#...
###..###....###
.##..##..#.#...
.#....#..######
#..##..########
########.#..#..
`.trim().split("\n\n").map((i) => i.trim().split("\n"));
}


const part1 = input.reduce((ret, map) => {

    console.log(map);
    let h =checkH(map);    
    let v = checkV(map);
    console.log('h='+ h + ' v=' + v + "\n");

    let checks = 0;
    let change = false;
    out:
    for(let row=0; row<map.length; row++) {
        for(let col=0; col<map[row].length; col++) {
            checks++;
            const mapSmudggeFix = map.map(line => line);
            const thing = mapSmudggeFix[row].split("")
            thing[col] = thing[col] == '.' ? '#' : '.';
            mapSmudggeFix[row] = thing.join("");

            let newH = checkH(mapSmudggeFix, h);    
            let newV = checkV(mapSmudggeFix, v);
            if (h && newV) {
                console.log('h -> v')
                h = 0;
                v = newV;
                change = true;
                break out;
            }
            if (h && newH && h !== newH) {
                console.log('h -> h')
                h = newH;
                v=0;
                change = true;
                break out;
            }
            if (v && newH) {
                console.log('v -> h')
                v=0;
                h=newH;
                change = true;
                break out;
            }
            if (v && newV && v !== newV) {
                console.log('v -> v')
                v=newV;
                h=0;
                change = true;
                break out;
            }
        }
    }
    if (!change) {
        console.log('no change ', checks);
        //process.exit();
    }
    console.log('h='+ h + ' v=' + v + "\n");

    return ret + (v * 100) + h;

}, 0);
console.log('part1: ' + part1)


function checkV(map, not=null) {
    //console.log('checkV', map)

    let removeRows = 0;
    do {
        let found = true;
        let mapTopCopy = map.slice(removeRows);
        for(let row=0; row<mapTopCopy.length -1; row++) {
            if (mapTopCopy[row] !== mapTopCopy[mapTopCopy.length-1-row]) {
                found = false;
                break;
            }
        }
        if (found && mapTopCopy.length %2==0) {
            //console.log('top find')
            //mapTopCopy.forEach(d => console.log(d))
            const ret = mapTopCopy.length / 2 + removeRows;
            if (not == null || ret !== not) {
                return ret;
            }
        }

        found = true;
        let mapBottomCopy = map.slice(0, map.length - removeRows);
        for(let row=0; row<mapBottomCopy.length -1; row++) {
            if (mapBottomCopy[row] !== mapBottomCopy[mapBottomCopy.length-1-row]) {
                found = false;
                break;
            }
        }
        if (found && mapTopCopy.length %2==0) {
            const ret = mapBottomCopy.length / 2;
            if (not == null || ret !== not) {
                return ret;
            }
        }

        removeRows++;
    } while(removeRows < map.length - 1);
    return 0;
}

function checkH(map, not=null) {
    let removeCols = 0;
    do {
        let found = true;
        let removeStartCopy = map.map((line) => line.slice(removeCols));
        let maxCol = removeStartCopy[0].length - 1;
        for(let col=0; col<maxCol / 2; col++) {
            if (!removeStartCopy.every((row) => row[col] === row[maxCol - col])) {
                found = false;
                break;
            }
        }
        if (found && removeStartCopy[0].length %2==0) {
            const ret = removeStartCopy[0].length / 2 + removeCols;
            if (not == null || ret !== not) {
                return ret;
            }
        }

        found = true;
        let removeEndCopy = map.map((line) => line.slice(0, line.length-removeCols));
        maxCol = removeEndCopy[0].length - 1;
        for(let col=0; col<maxCol / 2; col++) {
            if (!removeEndCopy.every((row) => row[col] === row[maxCol - col])) {
                found = false;
                break;
            }
        }
        if (found && removeEndCopy[0].length %2==0) {
            const ret= removeEndCopy[0].length / 2;
            if (not == null || ret !== not) {
                return ret;
            }
        }

        removeCols++;
    } while (removeCols < map[0].length -1);

    return 0;


    /*//console.log('checkH', map)
    if (map[0].length === 1) {
        return 0;
    }

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
    //console.log('loop done')
    //map.forEach(d => console.log(d))
    
    return map[0].length/2 + add;*/
}