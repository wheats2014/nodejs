const buf = new Buffer('hello world!', 'ascii');
console.log(buf);
console.log(buf.toString('hex'));
console.log(buf.toString('base64'));
console.log(buf.toString('utf-8'));

console.log(Buffer.byteLength("wheats"));
