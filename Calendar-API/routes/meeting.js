const express = require('express');
const router = express.Router();
const client = require('../initDB');

client.connect();
router.get('/meeting', (req, res) => {
   client.query(`SELECT * FROM Employee`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
      })
   client.end  
})

router.get('/1', (req, res) => {
    res.render('index', {Meeting: "Meeting where ID is > 1"});
})

module.exports = router;