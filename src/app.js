const http = require('http');
const chalk = require('chalk');
const path = require('path');
const router = require('./helper/router');
const conf = require('./config/defaultConfig');
// const open = require('./helper/open');

class Server {
    constructor(useConfig) {
        this.conf = Object.assign({}, conf, useConfig);
    }
    start() {
        const server = http.createServer((req, res) => {
            let url = req.url;
            if(url === '/favicon.ico'){
                url = '/';
            }
            const filePath = path.join(this.conf.root, url);
            router(req, res, filePath, this.conf)
        });
        server.listen(this.conf.port, this.conf.hostname, () => {
            const addr = `http://${this.conf.hostname}:${this.conf.port}`;
            // open(addr);
            console.log(`Server started at ${chalk.green(addr)}`);
        })
    }
}

module.exports = Server;