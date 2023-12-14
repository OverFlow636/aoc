let input = require('fs').readFileSync('./input12.txt').toString().trim().split("\n");

if (00) {
    input = `
.??..??...?##. 1,1,3
?###???????? 3,2,1
???.### 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
`.trim().split("\n")
}

let checkCount = 0;
let cacheCount = 0;

function memoize(func) {
    const stored = new Map();
    return (...args) => {
      const k = JSON.stringify(args);
      if (stored.has(k)) {
        cacheCount++;
        return stored.get(k);
      }
      checkCount++;
      const result = func(...args);
      stored.set(k, result);
      return result;
    };
}

function check(string, required) {
    
    
    if (!string.length) {
        if (!required.length) {
            return  1;
        }
        return 0;
    }
    if (!required.length) {
        return  string.indexOf('#') === -1;
    }

    if (string.length < required.reduce((ret, i) => ret + i, required.length - 1)) {
        return 0;
    }

    if (string[0] === '.') {
        return  checker(
            string.substring(1), 
            required
        );
    }

    if (string[0] === "#") {
        const [run, ...leftoverRuns] = required;
        for (let i = 0; i < run; i++) {
          if (string[i] === ".") {
            return 0;
          }
        }
        if (string[run] === "#") {
          return 0;
        }
    
        return checker(string.slice(run + 1), leftoverRuns);
    }

    return checker("#" + string.slice(1), required) 
        + checker("." + string.slice(1), required);
}


let checker = memoize(check);


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
    const chk = checker(expandedMap, expandedRows)
    console.log('result: ' + map + ' = ' + chk);

    console.log('count: ', checkCount)
    console.log('cached: ', cacheCount)
    //console.log('cache: ', cache)

    return chk;
});

console.log('choices', choices);
console.log('sum', choices.reduce((ret, i) => ret + i, 0));
