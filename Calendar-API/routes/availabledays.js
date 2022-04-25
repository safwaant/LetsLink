const express = require('express');
const router = express.Router();
const client = require('../initDB');

router.get('/', (req, res) => {
    let availDaysData = [];
    let personsData = [];
    let groupsData = [];
    client.query(`SELECT * FROM AvailableDaysJoin`, (err, result) => {
        res.json(result.rows);
        availDaysData = result.rows;
    });
    client.query(`SELECT * FROM person`, (err, result)=>{
        personsData = result.rows;
    });

    client.end;
    // Logic here to use availDaysData, personsData, and groupsData to send meaningful response
});

router.post('/', (req, res) => {

});

router.put('/', (req, res) => {

});

router.delete('/', (req, res) => {

});

module.exports = router;