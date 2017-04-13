var fs = require('fs');
var rs = fs.createReadStream('./test.md', {highWaterMark : 100});

var content = '';
var counter = 0;

rs.on('data', (chunk) => {
  content += chunk;
  console.log(++counter);
});

rs.on('end', () => { console.log(content); });
