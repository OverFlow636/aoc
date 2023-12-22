const express = require('express')
const app = express()
const port = 3001;

app.get('/', (req, res) => {
    const host = req.headers && req.headers.host || null;
    console.log('in host: ' + host);
    switch (host) {
        case 'redirect.sparkcures.com':
            switch (req.path) {
                case '/test': return res.redirect(302, 'https://sparkcures.com?testRedirect=true');
            }

            break;
        case 'msk.sparkcures.doctor':
            return res.redirect(302, 'https://sparkcures.doctor/?demoUser=msk');

        case 'sparkcures.co':
            break;

        case 'ntrktrials.com':
            return res.redirect(302, 'https://ntrkers.sparkcures.com/?utm_source=' + (req.path !== '/' ? req.path.substr(1).toLowerCase() : host));

    }
    return res.redirect(302, 'https://sparkcures.com/?unknownRedirect=' + host + req.path);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
