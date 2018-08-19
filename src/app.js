const http = require('http');
const chalk = require('chalk');
const path = require('path');
const router = require('./helper/router');
const conf = require('./config/defaultConfig');

const server = http.createServer((req, res) => {
    const url = req.url;
    const filePath = path.join(conf.root, url);
    router(req, res, filePath)
});

server.listen(conf.port, conf.hostname, () => {
    const addr = `http://${conf.hostname}:${conf.port}`
    console.log(`Server started at ${chalk.green(addr)}`);

})
