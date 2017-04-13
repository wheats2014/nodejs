
let fs = require('fs');
fs.writeFile('./test.md', '我是异步写进去的', (err) => {
  if (err) {
    throw err;
  }
});
