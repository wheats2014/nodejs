/**
 * 缓存
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
        let cacheable = extension.match(/^(gif|png|jpg|css|js)$/ig);
        res.statusCode = 200;
        res.setHeader('Content-Type', fileType);

        if (cacheable) {
          let expires = new Date();
          expires.setTime(expires.getTime() +
                          60 * 60 * 24 * 365 * 1000); // 一年的时间
          res.setHeader('Express', expires.toUTCString());
          res.setHeader('Cache-Control',
                        'max-age=' + 60 * 60 * 24 * 365 * 1000);
          let lastModified = stats.mtime.toUTCString();
          res.setHeader('Last-Modified', lastModified);
          if (req.headers['if-modified-since'] &&
              lastModified == req.headers['if-modified-since']) {
            res.statusCode = 304;
            res.end();
          }
        }

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
