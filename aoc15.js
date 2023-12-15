

let input = require('fs').readFileSync('./input15.txt').toString().trim().split(",");

//let input = 'rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7'.split(',');

const totals = input.map((step) => {
    return hash(step);
}, 0);

function hash(input) {
    return input.split("").reduce((ret, char) => {

        //Determine the ASCII code for the current character of the string.
        let code = char.charCodeAt(0);
        
        //Increase the current value by the ASCII code you just determined.
        ret += code;
    
        //Set the current value to itself multiplied by 17.
        ret *=17;
    
        //Set the current value to the remainder of dividing itself by 256.
        ret %=256;
    
        return ret;
    }, 0)
}

//console.log('totals: ', totals);
//console.log('totals: ', totals.reduce((sum, i) => sum + i,0));

const boxes = input.reduce((boxes, step, i) => {
    if (step.indexOf('-') > -1) {
        const label = step.substring(0, step.indexOf('-'));
        const box = hash(label);
        if (!boxes[box]) {
            boxes[box] = [];
        }

        let found = boxes[box].findIndex(l => l.label === label);
        if (found > -1) {
             boxes[box].splice(found, 1);
        }

    } else {
        const [label, focus] = step.split('=');
        const box = hash(label);
        if (!boxes[box]) {
            boxes[box] = [];
        }

        let found = boxes[box].find(l => l.label === label);
        if (found) {
            found.focus = parseInt(focus,10);
        } else {
            boxes[box].push({label, focus:parseInt(focus,10)});
        }

    }

    return boxes;
}, {});

console.log('boxes', boxes);

console.log('sum: ', Object.keys(boxes).reduce((ret, boxNum) => 
    ret +  boxes[boxNum].reduce((ret, l, i) =>  ret + (parseInt(boxNum,10)+1) * (i+1) * l.focus, 0)
,0));

