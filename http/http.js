'use strict';
const http = require('http');
let server = http.createServer((req, res)=>{
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('liangxinglei');
  res.end('Hello World!');
});
server.listen(8000);
