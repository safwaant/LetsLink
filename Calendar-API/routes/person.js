const { query } = require('express');
const express = require('express');
const router = express.Router();
const client = require('../initDB');

router.get('/', (req, res) => {
   client.query(`SELECT * FROM person`, (err, result)=>{
        res.json(result.rows);
      })
   client.end  
})

router
.route('/:id')
.get((req, res) => {
   client.query(`SELECT P.id, P.Person_Name FROM Person P WHERE P.id = ${req.params.id}`, (err, result)=> {
     res.json(result.rows); 
   })
   client.end
})
.delete((req, res) => {
   client.query(`DELETE FROM Person P WHERE P.id = ${req.params.id}`, (err, result) => {
      res.sendStatus();
   }) 
   client.end
})

//router.params('id', (req, res, next, id));


module.exports = router;