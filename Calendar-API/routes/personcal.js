const express = require('express');
const router = express.Router()
const client = require('../initDB');


router.get('/', (req, res) => {
    client.query(`SELECT * FROM PersonAvailableDays`, (err, result) => {
       res.json(result.rows); 
    })
    client.end
})

router.route('/:id')
.get((req, res) => {
    client.query(`SELECT Person`)
})
module.exports = router