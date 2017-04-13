let fs = require('fs');
let text = fs.readFile('./test.md', (err, data) => {
  if (err) {
    console.log(err);
    return false;
  }
  console.log('async: ');
  console.log('async: ' + data);
});
