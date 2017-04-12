const util = require('util');
const EventEmitter = require('events');

function MyStream() { EventEmitter.call(this); };
util.inherits(MyStream, EventEmitter);

MyStream.prototype.write = function(content) { this.emit('data', content); }

var stream = new MyStream();
stream.on('data', (content) => { console.log(`${content}`); });
stream.write("It works!");
