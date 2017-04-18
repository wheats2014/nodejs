'use strict';
const http = require('http');
const connect = require('connect');

let app = connect();

app.use((req, res, next)=>{
  console.log(req.url);
  next();
});


http.createServer(app).listen(8000);
