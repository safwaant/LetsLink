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
    client.query(`SELECT P.id FROM Person P WHERE P.id = 1`, (err, result) => {
       res.send(result.rows);
    })
})


module.exports = router;