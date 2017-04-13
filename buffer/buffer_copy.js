const buf1 = new Buffer(26);
const buf2 = new Buffer(26).fill('!');

for (var i = 0; i < 26; i++) {
  buf1[i] = i + 97;
}

buf1.copy(buf2, 8, 16, 20);
console.log(buf1.toString('utf-8'));
console.log(buf2.toString('utf-8'));
