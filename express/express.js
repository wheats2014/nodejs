'use strict';

var express = require('express');
let app = express();

app.get('/', (req, res) => { res.end('hello world!'); });
app.listen(8000);
