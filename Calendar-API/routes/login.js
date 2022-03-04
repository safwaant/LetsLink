const express = require('express');
const client = require('../initDB');
const router = express.Router()

router.get('/', (req, res) => {
   client.query(`SELECT P.Person_Name FROM Person P`, (err, result) => {
      res.json(result.rows) 
   }) 
   client.end
})

router.route('/:password')
.post((req, res) => {
    client.query(`SELECT P.Person_Name FROM Person P WHERE P.Person_Password = ${req.params.password}`, (err, result) => {
        res.send(result.rows);
    })
    client.end
})

module.exports = router;