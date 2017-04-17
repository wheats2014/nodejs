/**
 * 指定一个文件夹做为根目录
 * node.js提供的zlib模块 gzip压缩
*/

'use strict';
const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const handlebars = require('handlebars');
const mime = require('mime');
const zlib = require('zlib');

let server = http.createServer(function(req, res) {

  let pathName = url.parse(req.url).pathname;
  let realPath =
      path.join(__dirname, path.normalize(pathName.replace(/\.\./g, '')));

  fs.stat(realPath, (err, stats) => {
    if (err) {

      res.writeHead('404', {'Content-Type' : 'text/html'});

      let source = fs.readFileSync('./template/404.tmpl'),
          template = handlebars.compile(source.toString()),
          data = {path : url.parse(req.url).pathname};

      res.end(template(data));

    } else {
      if (stats.isDirectory()) {

        let source = fs.readFileSync('./template/directory.tmpl');
        let template = handlebars.compile(source.toString());
        let data =
        {
          title : url.parse(req.url).name,
          path : path.join(pathName, '/'),
          files : []
        }

        // 同步
        // data.files = fs.readdirSync(realPath);
        // res.end(template(data));

        // 异步
        fs.readdir(realPath, (err, files) => {
          data.files = files;
          res.end(template(data));
        });
      } else {

        // 读取文件扩展名
        let extension = path.extname(pathName).replace('.', '');
        let fileType = mime.lookup(extension) || 'text/plain';

        let acceptEncoding = req.headers['accept-encoding'] || '';
        let compressable = extension.match(/css|js|html|json|xml|txt|md/ig);
        res.statusCode = 200;
        res.setHeader('Content-Type', fileType);

        if (compressable && acceptEncoding.match(/\bgzip\b/)) {
          res.setHeader('Content-Encoding', 'gzip');
          fs.createReadStream(realPath).pipe(zlib.createGzip()).pipe(res);
        } else if (compressable && acceptEncoding.match(/\bdeflate\b/)) {
          res.setHeader('Content-Encoding', 'defalte');
          fs.createReadStream(realPath).pipe(zlib.createDeflate()).pipe(res);
        } else {
          fs.createReadStream(realPath).pipe(res);
        }
      }
    }
  });

});

server.listen(8000);
