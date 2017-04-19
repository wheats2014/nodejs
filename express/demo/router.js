
var expressApp = require('./app');
let router2 = expressApp.express.Router();
router2.use(function(req, res, next) {
  console.log('router2 Time: ' + Date.now());
  next();
});

router2.use('/', function(req, res) { res.send('User home page'); });
router2.get('/about', function(req, res) { res.send('About user'); });
app.use('/user', router2);
module.exports = router2;
