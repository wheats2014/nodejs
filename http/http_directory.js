/**
 * 循环读取文件与文件夹
*/

'use strict';
const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const handlebars = require('handlebars');
const mime = require('mime');

let server = http.createServer(function(req, res) {

  let pathName = url.parse(req.url).pathname;
  let realPath = path.join(__dirname, pathName);

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

        console.log("========================");
        console.log(fileType);
        console.log("========================");
        res.setHeader('Content-Type', fileType);
        fs.createReadStream(realPath).pipe(res, 'utf-8');
      }
    }
  });

});

server.listen(8000);
