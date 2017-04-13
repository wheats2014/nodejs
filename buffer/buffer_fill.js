const buf1 = new Buffer(10).fill(0);
const buf2 = new Buffer(14).fill(0);
const buf3 = new Buffer(18).fill(0);

const totalLength = buf1.length + buf2.length + buf3.length;

console.log(totalLength);

const bufA = Buffer.concat([ buf1, buf2, buf3 ], totalLength);
console.log(bufA);
console.log(bufA.length);
