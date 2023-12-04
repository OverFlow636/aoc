const input = require('fs').readFileSync('./input4.txt').toString().trim().split("\n");
const multiplier = input.map(() => 1);

const part1 = input.reduce((ret, line, cardNum) => {
    let [nums, win] = line.split('|');
    nums = nums.substring(nums.indexOf(':') + 2).trim();
    nums = nums.split(' ').map((n) => parseInt(n.trim(), 10));
    win = win.trim().split(' ').filter(Boolean).map((n) => parseInt(n.trim(), 10));

    const has = nums.filter((ia) => win.includes(ia));

    // part2
    for (let i = cardNum + 1; i <= (cardNum + has.length); i++) {
        multiplier[i] += multiplier[cardNum];
    }

    return ret + (has.length ? (1 << has.length - 1) : 0);
}, 0);

console.log('part1: ' + part1);
console.log('part2: ' + multiplier.reduce((ret, m) => ret + m, 0));
