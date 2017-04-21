var fs = require('fs');
var path = require('path');

fs.readFile(path.join(__dirname, 'file', '1.jpeg'),
            function(err, buf) { console.log(buf.toString('base64')); });
