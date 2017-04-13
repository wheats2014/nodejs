var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf-8');
console.log(new Buffer('这是个测试。'));

var buf1 = new Buffer([ 0xe8, 0xbf, 0x99, 0xe6, 0x98 ]);
console.log(decoder.write(buf1));
