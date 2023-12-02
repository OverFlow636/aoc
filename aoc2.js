let games = require('fs').readFileSync('./input.txt').toString().trim();
let part1 = 0;
let part2 = 0;
games.split("\n").forEach((game, index) => {

    // remove prefix
    game = game.substring(game.indexOf(" ", 5)+1);

    let colors = {};

    // gather max number of each color used per game
    game.split(';').forEach((t) => {
        // cleanup
        t = t.trim();

        // split to colors
        t.split(',').forEach((colorline) => {
            colorline = colorline.trim();

            let count = parseInt(colorline.substring(0, colorline.indexOf(' ')));
            let color = colorline[colorline.indexOf(' ')+1];

            if (!colors[color] || colors[color]<count) {
                colors[color] = count;
            }
        });
    });

    // pass part 1 =  12 red cubes, 13 green cubes, and 14 blue
    if (colors['r'] <= 12 && colors['g'] <= 13 && colors['b'] <= 14) {
        part1 += index+1
    }

    // part 2
    let pow = colors['r'] * colors['g'] * colors['b'];
    part2 += pow;

    //console.log('game ' + index + ' => ' + game, colors, 'power: ' + pow);
})
console.log('part1: ' + part1)
console.log('part2: ' + part2)