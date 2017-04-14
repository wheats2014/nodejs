let fs = require('fs');
let copy =
    () => {
      let out = process.stdout, rs = fs.createReadStream('./source/a.exe'),
          ws = fs.createWriteStream('./dist/a.exe'),
          stat = fs.statSync('./source/a.exe'), total = stat.size, length = 0,
          last = 0, start = Date.now();
      rs.on('data', (chunk) => {
        length += chunk.length;
        if (ws.write(chunk) === false) {
          rs.pause();
        }
      });

      ws.on('drain', () => { rs.resume(); });

      rs.on('end', () => { ws.end(); });

      setTimeout(function display() {
        let percent = ((length / total) * 100).toFixed(2),
            speed = ((length - last) * 10 / 1000000).toFixed(2);

        last = length;
        out.clearLine(); // 清除当前的行
        out.cursorTo(0); // 光标显示到当前的行上
        out.write(`${length}KB\t/ ${total}KB\t ${percent}%\t ${speed} MB /s`);
        if (length < total) {
          setTimeout(display, 100);
        } else {
          var end = Date.now();
          console.log(`\n共用时： ${(end-start) / 1000}秒`);
        }
      }, 500);
    }

copy();
