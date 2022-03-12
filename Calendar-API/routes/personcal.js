const express = require('express');
const router = express.Router()
const client = require('../initDB');


router.get('/', (req, res) => {
    client.query(`SELECT * FROM PersonAvailableDays`, (err, result) => {
       res.json(result.rows); 
    })
    client.end
})

router.get('/name/:id', (req, res) => {
    client.query(`SELECT * FROM CalendarGroup WHERE Group_Code = ${req.params.id}`, (err, result) => {
        res.json(result.rows);
    })
    client.end
})

router.post('/add/:id/:date', (req, res) => {
    client.query(`SELECT P.AvailableDay FROM PersonAvailableDays
     P WHERE P.AvailableDay = ${req.params.date}`, (err, result) => {
           if(result.rowCount > 0){
             const person = result.rows;   
             client.query(`INSERT INTO PersonAvailableDays (P.AvailableDay, P.Person_ID) VALUES ${date}, ${id}`)  
           } 
      })   
})

router.route('/:id')
.get((req, res) => {
    client.query(`SELECT P.Person_AvailableDay FROM PersonAvailableDays P WHERE P.Person_ID = ${req.params.id}`, (err, result) => {
        res.json(result.rows);
    })
    client.end
})


module.exports = router