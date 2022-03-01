const express = require('express');
const router = express.Router();
const client = require('../initDB');

client.connect();
router.get('/meeting', (req, res) => {
   client.query(`SELECT * FROM meeting`, (err, result)=>{
        if(!err){
            const obj = result.rows;
            let people = '';
            obj.forEach( person => {
             people += person.purpose + ' ' + person.starttime +''; 
            });
            res.render('index', {Meeting: people});
        }
      })
   client.end  
})

router.get('/1', (req, res) => {
    res.render('index', {Meeting: "Meeting where ID is > 1"});
})

module.exports = router;