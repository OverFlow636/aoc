let input = require('fs').readFileSync('./input6.txt').toString().split("\n");

// part1
let times = input[0].substring(5).split(' ').filter(Boolean).map(x => parseInt(x.trim()));
let distances = input[1].substring(10).split(' ').filter(Boolean).map(x => parseInt(x.trim()));

console.log('part1: ' + times.map((time, raceNumber) => {
    const distanceToBeat = distances[raceNumber];
    const holdTimes = [];
    for (let i = 0; i < time; i++) {
        const distance = i * (time - i);
        if (distance > distanceToBeat) {
            holdTimes.push(i);
        }
    }
    return holdTimes.length;
}).reduce((ret, o) => ret ? ret * o : o, 0));

// part2
times = parseInt(input[0].replaceAll(/[^\d]/g, ''))
distances = parseInt(input[1].replaceAll(/[^\d]/g, ''))

const distanceToBeat = distances;
const holdTimes = [];
for (let i = 0; i < times; i++) {
    const distance = i * (times - i);
    if (distance > distanceToBeat) {
        holdTimes.push(i);
    } else {
        if (holdTimes.length) {
            break;
        }
    }
}
console.log('part2: ', holdTimes.length);
