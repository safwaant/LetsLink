var express = require('express');
var router = express.Router();
var model = require('../model/personDAO');

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
