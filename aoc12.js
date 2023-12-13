let input = require('fs').readFileSync('./input12.txt').toString().trim().split("\n");

if (1) {
    input = `
.??..??...?##. 1,1,3
?###???????? 3,2,1
???.### 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
`.trim().split("\n")
}
const cache = {};

let checkCount = 0;
let cacheCount = 0;
const choices = input.map((line) => {
    const [map, second] = line.trim().split(' ');
    const rows = second.trim().split(',').filter(Boolean).map(x => parseInt(x, 10));

    let expandedMap = '';
    for (let i = 0; i < 5; i++) {
        expandedMap = expandedMap + map + (i < 4 ? '?' : '');
    }
    //console.log('expanded ' + expandedMap)

    let expandedRows = [];
    for (let i = 0; i < 5; i++) {
        expandedRows.push(...rows);
    }
    //console.log('expanded2 ' + expandedRows)

    //const chk = check(map, rows)
    const chk = check(expandedMap, expandedRows)
    console.log('result: ' + map + ' = ' + chk);

    console.log('count: ', checkCount)
    console.log('cached: ', cacheCount)
    //console.log('cache: ', cache)

    process.exit();
    return chk;
});

console.log('choices', choices);
console.log('sum', choices.reduce((ret, i) => ret + i, 0));



function check(string, required, depth =0) {
    if (cache[string + required] !== undefined) {
        cacheCount++;
        return cache[string+required];
    }
    checkCount++;
    
    if (!string.length) {
        if (!required.length) {
            return cache[string+required] = 1;
        }
        return cache[string+required] = 0;
    }
    if (!required.length) {
        return cache[string+required] = string.indexOf('#') === -1;
    }

    if (string[0] === '?') {
        const broken = replaceWith(string, 0, "#");
        const fixed = replaceWith(string, 0, ".");

        let one = check(broken, required, depth + 1);
        let two = check(fixed, required, depth + 1);

        return cache[string+required] = one + two;
    } else if (string[0] === '#') {
        let good = true;
        for(let i=0; i<required[0]; i++) {
            if (string[i] === '.') {
                good = false;
                break;
            }
        }

        // next char needs to be ? or .
        if (string[required[0]] === '#') {
            good = false;
        }

        if (good) {
            return cache[string + required] = check(
                string.substring(required[0]+1), 
                required.slice(1), 
                depth + 1, 
            )
        }
        return cache[string+required] = 0;
    } else if (string[0] === '.') {
        let pos = string.split("").findIndex(d => d!=='.');
        return cache[string+required] = check(
            string.substring(pos), 
            required, 
            depth + 1,
        );
    }
}

function replaceWith(string, i, char) {
    return string.substring(0, i) + char + string.substring(i + 1)
}

function count(string, char) {
    return string.split('').filter(i => i === char).length;
}
