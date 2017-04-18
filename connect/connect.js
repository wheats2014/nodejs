'use strict';
const http = require('http');
const connect = require('connect');
const url = require('url');
const path = require('path');

let app = connect(),
    filePath = '';

app.use((req, res, next)=>{
  console.log(req.url);
  next();
});

app.use((req, res)=>{

  res.end('hello world!');
});

http.createServer(app).listen(8000);
