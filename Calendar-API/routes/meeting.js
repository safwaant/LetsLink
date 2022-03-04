const express = require('express');
const router = express.Router();
const client = require('../initDB');

client.connect();
router.get('/person', (req, res) => {
   client.query(`SELECT * FROM person`, (err, result)=>{
        res.send(result.rows);
      })
   client.end  
})

router.get('/1', (req, res) => {
    res.render('index', {Meeting: "Meeting where ID is > 1"});
})

module.exports = router;