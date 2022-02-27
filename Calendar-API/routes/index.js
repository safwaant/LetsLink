var express = require('express');
var router = express.Router();
var controller = require('../controllers/index');

const client = require('../initDB.js');
client.connect();

/* GET home page. */
router.get('/api/v1/meeting', function(req, res, next) {
  //controllers.meeting()
  client.query(`SELECT * FROM Employee WHERE id >= 1`, (err, result)=>{
    if(!err){
        res.send(result.rows)
    }
    console.log(req.baseUrl)
  })
  client.end  
  // res.render('something', {title: 'Example Text});
});

router.post('/', function(req, res, next) {
  res.send('index');
});

router.put('/', function(req, res, next) {
  res.send('index');
});


module.exports = router;
