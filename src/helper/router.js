const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const {
    promisify
} = require('util');
const art = require('art-template');
const mime = require('../helper/mime');
const isFresh = require('../helper/cache');
const compress = require('./compress');

const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const templatePath = path.join(__dirname, '../template/dir.art');
const source = fs.readFileSync(templatePath, 'utf-8');
const template = art.compile(source);

module.exports = async function (req, res, filePath, conf) {
    try {
        const stats = await stat(filePath)
        const ContentType = mime(filePath);
        if (stats.isFile()) {
            if (isFresh(stats, req, res)) {
                res.statusCode = 304;
                res.end();
                return;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', ContentType);
            // FIXME:读取文件中文乱码的问题还没解决
            let rs = fs.createReadStream(filePath, {encoding:'utf8'});
            // 如果文件匹配压缩,则执行压缩
            if (filePath.match(conf.compress)) {
                rs = compress(rs, req, res)
            }
            rs.pipe(res);
        } else if (stats.isDirectory()) {
            if (isFresh(stats, req, res)) {
                res.statusCode = 304;
                res.end();
                return;
            }
            const files = await readdir(filePath);
            
            // const dirList = [];
            // for (let item of files) {
            //     item = new fs.Stats();
            //     if(item.isDirectory()){
            //         dirList.push(item);
            //         files.slice(files.indexOf(item), 1);
            //     }
            // }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');

            const dir = path.relative(conf.root, filePath);
            const data = {
                title: path.basename(filePath),
                // files: {files, icons},
                files,
                dir: dir ? `/${dir}` : ''
            }
            res.end(template(data));
        }
    } catch (err) {
        console.log(chalk.red(err));
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain;charset=utf-8')
        res.end(`${filePath} is not a directory or file`);
    }
}
