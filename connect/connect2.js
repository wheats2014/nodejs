'use strict';
const http = require('http');
const connect = require('connect');
const serveIndex = require('serve-index');

let app = connect();
app.use(serveIndex(__dirname, {'icons' : true}));

app.use((req, res) => { res.end('Hello from connect!'); });

http.createServer(app).listen(3000);
