var fs = require('fs');
var through2 = require('through2');
var rs = fs.createReadStream('./source/ex.txt');
rs.pipe(through2(function(chunk, enc, callback) {
    for (var i = 0; i < chunk.length; i++) {
      if (chunk[i] === 97) {
        chunk[i] = 122;
      }
      this.push(chunk);
      callback();
    }
  }))
    .pipe(fs.createWriteStream('./dist/out.txt'))
    .on('finish', () => { console.log('done'); });
