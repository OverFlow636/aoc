const input = require('fs').readFileSync('./input7.txt').toString().trim().split("\n");

// part 2 , j moved
const valueMap = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A'];



const parsed = input
    .reduce((ret, line) => {
        const [hand, bet] = line.trim().split(' ');


        const uniqueChars = hand.split("").filter(onlyUnique);
        const cardCounts = uniqueChars.reduce((ret, l) => {
            ret.push(hand.split("").filter(c => c === l).length);
            return ret;
        }, []).sort();
        const jokers = hand.split("").filter(c => c === 'J').length;

        //console.log('cardCounts', cardCounts)

        let type = 7
        if (
            cardCounts.includes(5)
            || (cardCounts.includes(4) && jokers == 1)
            || (cardCounts.includes(3) && jokers == 2)
            || (cardCounts.includes(2) && jokers == 3)
            || (cardCounts.includes(1) && jokers == 4)
        ) {
            //Five of a kind
            type = 1;
        } else if (
            cardCounts.includes(4)
            || (cardCounts.includes(3) && jokers == 1)
            || (cardCounts.filter((c) => c === 2).length === 2 && jokers == 2)
            || (cardCounts.includes(1) && jokers == 3)
        ) {
            // Four of a kind
            type = 2;
        } else if (
            cardCounts.includes(3) && cardCounts.includes(2)
            || (cardCounts.filter((c) => c === 2).length === 2 && jokers == 1)
            || (cardCounts.includes(3) && jokers === 2)
        ) {
            //Full house
            type = 3;
        } else if (
            cardCounts.includes(3) && cardCounts.filter((c) => c === 1).length === 2
            || (cardCounts.includes(2) && jokers === 1)
            || (cardCounts.includes(1) && jokers === 2)
        ) {
            //Three of a kind
            type = 4;
        } else if (
            cardCounts.filter((c) => c === 2).length === 2
            || (cardCounts.includes(2) && jokers === 1)
        ) {
            //Two pair
            type = 5;
        } else if (
            cardCounts.includes(2) && cardCounts.filter((c) => c === 1).length === 3
            || (cardCounts.filter((c) => c === 1).length === 5 && jokers >= 1)
        ) {
            //One pair
            type = 6;
        }

        ret.push({
            hand,
            type,
            bet: parseInt(bet, 10),
            jokers,
            cardCounts,
        });
        return ret;
    }, [])
    .sort((a, b) => {

        if (a.type === b.type) {

            // find first card that is different, then score
            for (let pos = 0; pos < 5; pos++) {
                if (a.hand[pos] !== b.hand[pos]) {
                    return valueMap.indexOf(b.hand[pos]) - valueMap.indexOf(a.hand[pos]);
                }
            }
            process.exit(1);

        } else {
            return a.type - b.type;
        }
    })
    .reduce((ret, c, i, orig) => {
        c.rank = orig.length - i;
        c.score = c.bet * c.rank;
        return ret + c.score;
    }, 0);

console.log('parsed: ', parsed);



function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
}
