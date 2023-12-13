const exp = require('constants');

let input = require('fs').readFileSync('./input12.txt').toString().trim().split("\n");

if (1) {
    input = `
???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1
`.trim().split("\n")
}


const choices = input.map((line) => {
    const [map, second] = line.trim().split(' ');
    const rows = second.trim().split(',').filter(Boolean).map(x => parseInt(x, 10));

    let expandedMap = '';
    for (let i = 0; i < 5; i++) {
        expandedMap = expandedMap + map + (i < 4 ? '?' : '');
    }
    console.log('expanded ' + expandedMap)

    let expandedRows = [];
    for (let i = 0; i < 5; i++) {
        expandedRows.push(...rows);
    }
    console.log('expanded2 ' + expandedRows)

    //const chk = check(map, rows)
    const chk = check(expandedMap, expandedRows)
    console.log('check: ' + map + ' = ' + chk);

    process.exit();
    return chk;
});

console.log('choices', choices.reduce((ret, i) => ret + i, 0));


function check(string, required) {

    // enqueue more permutations 
    if (string.indexOf('?') > -1) {
        for (let i = 0; i < string.length; i++) {
            if (string[i] === '?') {
                const broken = replaceWith(string, i, "#");
                if (count(broken, '.') < required.length) {
                    return 0;
                }

                const fixed = replaceWith(string, i, ".");

                return check(broken, required)
                    + check(fixed, required)
            }
        }
    } else {
        // early check for shape alone
        const spl = string.replace(/^\.+/, '').replace(/\.+$/, '').replace(/\.+/g, '.').split('.');
        console.log('check: ' + string);
        if (spl.length !== required.length) {
            return 0;
        }
        const match = spl.map(spl => spl.length).every((a, i) => a === required[i]);
        console.log('check: ' + string + ' ' + (match ? 'Yes' : ''))
        return match ? 1 : 0;
    }

}

function replaceWith(string, i, char) {
    return string.substring(0, i) + char + string.substring(i + 1)
}

function count(string, char) {
    return string.split('').filter(i => i === char).length;
}
