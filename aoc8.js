let input = require('fs').readFileSync('./input8.txt').toString().trim().split("\n");

const steps = input[0].trim().split("");
//console.log('steps: ', steps);

const map = input.slice(2).reduce((ret, line) => {
    const [source, directions] = line.trim().split(' = ');
    const [left, right] = directions.replaceAll('(','').replaceAll(')','').split(',').map(d => d.trim());
    
    ret[source] = {
        L: left,
        R: right
    };
    return ret
}, {});
//console.log('map: ', map)

let starts = Object.keys(map).filter((key) => key[2] === 'A');

let counts = starts.map((current) => {
    let step = 0;
    do {
        current = map[current][steps[step++ % steps.length]];
    } while(current[2] !== 'Z');
    return step;
})

const gcd = (a, b) => a ? gcd(b % a, a) : b;
const lcm = (a, b) => a * b / gcd(a, b);
console.log('lcm: ' + counts.reduce(lcm));
