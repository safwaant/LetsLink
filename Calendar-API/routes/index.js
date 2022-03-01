var express = require('express');
var router = express.Router();
var model = require('../model/meetingmodel');

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('testlogin');  
});

router.post('/', function(req, res, next) {
  res.send('index');
});

router.put('/', function(req, res, next) {
  res.send('index');
});


module.exports = router;
