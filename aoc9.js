let input = require('fs').readFileSync('./input9.txt').toString().trim().split("\n");

const nextValues = input.map(line => {
    const nums = line.trim().split(' ').filter(Boolean).map(d => parseInt(d.trim()));

    let rows = [nums];
    let next = nums;
    do {
        next = getDiffs(next);
        rows.push(next);
    } while(next.reduce((ret, n) => ret + n, 0) !== 0);

    // part1
    //return getExForward(rows, rows.length-1, 0)
    // part2
    return getExBackwards(rows, 0);
});

console.log('sum: ', nextValues.reduce((sum, v) => sum+v, 0));

function getExBackwards(rows, index) {
    if (index === rows.length-1) {
        return 0;
    } else {
        return rows[index][0] - getExBackwards(rows, index+1);
    }
}

function getExForward(rows, index, value) {
    if (index == 0) {
        return value + rows[index][rows[index].length-1];
    } else {
        return value + getExForward(rows, index-1, rows[index][rows[index].length-1]);
    }
}

function getDiffs(nums) {
    let newNums = [];

    for(let i=0; i<nums.length-1; i++) {
        newNums.push(nums[i+1] - nums[i]);
    }

    if (!newNums.length) {
        return [0];
    }

    return newNums;
}