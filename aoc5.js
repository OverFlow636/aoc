const {
    Worker, isMainThread, parentPort, workerData
} = require('worker_threads');


const input = require('fs').readFileSync('./input5.txt').toString().split("\n");

const seedsPart1 = input[0].substring(7).split(' ').map(x => parseInt(x.trim(), 10));

const maps = {
    'seed-to-soil': [],
    'soil-to-fertilizer': [],
    'fertilizer-to-water': [],
    'water-to-light': [],
    'light-to-temperature': [],
    'temperature-to-humidity': [],
    'humidity-to-location': [],
};

Object.keys(maps).forEach((name) => {
    processMap(input.findIndex(l => l === name + ' map:'), name);
});

function processMap(startLine, name) {
    let line = startLine + 1;
    do {
        const data = input[line].split(' ').map(x => parseInt(x.trim(), 10));

        // data[0] is dest
        // data[1] is source
        // data[2] is length of each

        maps[name].push({
            sourceStart: data[1],
            sourceEnd: data[1] + data[2] - 1,
            destStart: data[0],
        });

        line++;
    } while (input[line].trim() !== '');
}

function mapper(value, name) {
    const found = maps[name].find((range) => {
        if (value >= range.sourceStart && value <= range.sourceEnd) {
            return true;
        }
    });
    if (found) {
        return found.destStart + (value - found.sourceStart);
    }
    return value;
}




if (isMainThread) {
    let part1 = seedsPart1.reduce((ret, seed) => {
        const s2s = mapper(seed, 'seed-to-soil');
        const s2f = mapper(s2s, 'soil-to-fertilizer');
        const f2w = mapper(s2f, 'fertilizer-to-water');
        const w2l = mapper(f2w, 'water-to-light');
        const l2t = mapper(w2l, 'light-to-temperature');
        const t2h = mapper(l2t, 'temperature-to-humidity');
        const h2l = mapper(t2h, 'humidity-to-location');

        if (ret === undefined) {
            return h2l;
        }

        return h2l < ret ? h2l : ret;

    }, undefined);
    console.log('part1: ' + part1);


    const proms = [];
    const seedsPart2 = input[0].substring(7).split(' ').map(x => parseInt(x.trim(), 10))
    seedsPart2.forEach((item, index) => {
        if ((index + 1) % 2 !== 0) {
            console.log('seed start ' + item + ' through ' + item + seedsPart2[index + 1]);

            proms.push(new Promise((resolve, reject) => {
                const worker = new Worker(__filename, {
                    workerData: {
                        start: item,
                        end: item + seedsPart2[index + 1]
                    }
                });
                worker.on('message', resolve);
                worker.on('error', reject);
                worker.on('exit', (code) => {
                    if (code !== 0)
                        reject(new Error(`Worker stopped with exit code ${code}`));
                });
            }))
        }
    });

    console.log('proms started')

    Promise.all(proms).then((results) => {
        console.log('lowest', results.reduce((ret, item) => item < ret ? item : ret, results[0]));
    });

} else {
    console.log('thread for start: ' + workerData.start + ' to: ' + workerData.end);

    let lowest = undefined;
    for (let x = workerData.start; x < workerData.end; x++) {
        const s2s = mapper(x, 'seed-to-soil');
        const s2f = mapper(s2s, 'soil-to-fertilizer');
        const f2w = mapper(s2f, 'fertilizer-to-water');
        const w2l = mapper(f2w, 'water-to-light');
        const l2t = mapper(w2l, 'light-to-temperature');
        const t2h = mapper(l2t, 'temperature-to-humidity');
        const h2l = mapper(t2h, 'humidity-to-location');

        if (lowest === undefined || lowest > h2l) {
            lowest = h2l;
        }
    }
    console.log('seed range ' + workerData.start + ' answer is ' + lowest);
    parentPort.postMessage(lowest);
}
