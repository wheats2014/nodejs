let fs = require('fs');
fs.mkdir('./hello', 0777, (err) => {
  if (err) {
    throw err;
  }
});
