const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const {
    promisify
} = require('util');
const conf = require('../config/defaultConfig');
const art = require('art-template');
const mime = require('../helper/mime');

const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const templatePath = path.join(__dirname, '../template/dir.art');
const source = fs.readFileSync(templatePath, 'utf-8');
const template = art.compile(source);
const compress = require('./compress');

module.exports = async function (req, res, filePath) {
    try {
        const stats = await stat(filePath)
        const ContentType = mime(filePath);
        if (stats.isFile()) {
            res.statusCode = 200;
            res.setHeader('Content-Type', ContentType);
            let rs = fs.createReadStream(filePath);
            // 如果文件匹配压缩,则执行压缩
            if (filePath.match(conf.compress)) {
                rs = compress(rs, req, res)
            }
            rs.pipe(res);
        } else if (stats.isDirectory()) {
            const files = await readdir(filePath)
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');

            const dir = path.relative(conf.root, filePath);
            const data = {
                title: path.basename(filePath),
                files,
                dir: dir ? `/${dir}` : ''
            }
            res.end(template(data));
        }
    } catch (err) {
        console.log(chalk.red(err));
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain')
        res.end(`${filePath} is not a directory or file`);
    }
}
