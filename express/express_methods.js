'use strict';

var express = require('express');
let app = express();

app.get('/', (req, res) => { res.end('Got a POST request'); });

app.post('/', (req, res) => { res.send('Got a POST request'); });

app.put('/user', (req, res) => { res.send('Got a PUT request at /user'); });

app.delete('/user',
           (req, res) => { res.send('Got a DELETE request at /user'); });

app.listen(8000, () => { console.log('Example app listening on port 8000!'); });
