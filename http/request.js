var http = require('http');
http.get({
  hostname: 'localhost',
  port: 800,
  path: '/',
  agent: false
}, (res) => {
  console.log(res);
});
