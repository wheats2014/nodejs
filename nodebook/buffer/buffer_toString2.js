var fs = require('fs');
var path = require('path');

fs.readFile(path.join(__dirname, 'file', 'name.txt'),
            function(err, buf) { console.log(buf.toString('ascii')); });
