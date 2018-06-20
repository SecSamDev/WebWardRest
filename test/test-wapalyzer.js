const Wappalyzer = require('wappalyzer')
const options = {
    debug: false,
    delay: 500,
    maxDepth: 3,
    maxUrls: 10,
    maxWait: 5000,
    recursive: true,
    userAgent: 'Wappalyzer',
    htmlMaxCols: 2000,
    htmlMaxRows: 2000,
};

const wappalyzer = new Wappalyzer('http://192.168.2.1/', options);

wappalyzer.analyze()
    .then(json => {
        process.stdout.write(JSON.stringify(json, null, 2) + '\n')
        process.exit(0);
    })
    .catch(error => {
        process.stderr.write(error + '\n')

        process.exit(1);
    });