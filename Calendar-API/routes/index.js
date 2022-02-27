var express = require('express');
var router = express.Router();
//var controller = require('../controllers/index');

/* GET home page. */
router.get('/api/v1/meeting', function(req, res, next) {
  //controllers.meeting()
  console.log("Got a GET req");
  res.send('Got a request at the router');
});

router.post('/', function(req, res, next) {
  res.send('index');
});

router.put('/', function(req, res, next) {
  res.send('index');
});


module.exports = router;
