var less = require('less');
var fs = require('fs');

fs.readFile('./less/test.less', (err, data) => {
  if (err) {
    return false;
  }

  less.render(data.toString(), (e, output) => {
    // debugger;
    fs.writeFile('./css/test.css', output.css, (err) => {
      if (err) {
        return false;
      }
      console.log("wirte done");
    });
  });
});
