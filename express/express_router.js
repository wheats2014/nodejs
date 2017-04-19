
'use strict';

var express = require('./app');

let router = express.Router();
router.use(function(req, res, next) {
  console.log('router1 Time: ' + Date.now());
  next();
});

router.use('/', function(req, res) { res.send('Birds home page'); });
router.get('/about', function(req, res) { res.send('About birds'); });

let app = express();
let router2 = require('./userRouter');
app.use('/birds', router);
app.use('/user', router2);

app.listen(8000);
