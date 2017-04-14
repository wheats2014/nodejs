var fs = require('fs');
var ws = fs.createWriteStream('./source/test.txt');
ws.write('beep ');
setTimeout(() => { ws.end('boop\n'); }, 1000);
