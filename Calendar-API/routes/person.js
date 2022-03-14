const { query } = require('express');
const express = require('express');
const router = express.Router();
const client = require('../initDB');

// Returns every single person on the table
//    (used for debugging and hidden from the end user)
router.get('/', (req, res) => {
   client.query(`SELECT * FROM person`, (err, result)=>{
        res.json(result.rows);
      })
   client.end  
})

// Returns a person's id based on the person's name
router.get('/id/:person_name', (req, res) => {
   client.query(`SELECT P.id FROM Person P WHERE P.Person_Name = '${req.params.person_name}'`, (err, result) => {
      res.json(result.rows);
   })
   client.end
})

// Returns a person's name based on the person's id
router
.route('/:id')
.get((req, res) => {
   client.query(`SELECT P.id, P.Person_Name FROM Person P WHERE P.id = ${req.params.id}`, (err, result)=> {
     res.json(result.rows); 
   })
   client.end
})

// Deletes the user based on the id
.delete((req, res) => {
   client.query(`DELETE FROM Person P WHERE P.id = ${req.params.id}`, (err, result) => {
      res.sendStatus();
   }) 
   client.end
})

//router.params('id', (req, res, next, id));


module.exports = router;