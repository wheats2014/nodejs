var http = require('http');

http.createServer((request, response) => { response.end("hello wheats"); })
    .listen(8000);
