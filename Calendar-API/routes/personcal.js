const express = require('express');
const { reset } = require('nodemon');
const router = express.Router()
const client = require('../initDB');

// Returns every single person available day
router.get('/', (req, res) => {
    client.query(`SELECT * FROM PersonAvailableDays`, (err, result) => {
       res.json(result.rows); 
    })
    client.end
})

//router.route('/name/:id')
//    .get(async (req, res) => {
//        try {
//            const sql = `SELECT * FROM personavailabledays WHERE person_id = $1`
//            const id = req.params.id
//            let response
//           response = await client.query(sql, [id])
//            console.log(response.rowCount)
//            if (response.rowCount > 0) {
//                res.status(200).send(response.rows);
//            } else {
//                res.status(404).send("Person Calendar Get Failed");
//            }
//        } catch (err) {
//            res.status(404).send({ message: "Person Calendar Get Failed" })
//        }
//        client.end
//})


// Retrieves all available days for the specified person. The parameter is person id
router.route('/:id/')
    .get( async (req, res) => {
        try {
            const sql = `SELECT Person_AvailableDay FROM PersonAvailableDays WHERE Person_ID = $1`
            const id = req.params.id
            let response
            response = await client.query(sql, [id])
            if (response.rowCount > 0) {
                res.status(200).send(response.rows);
            } else {
                res.status(404).send("Person with given ID has no available days");
            }
        } catch (err) {
            res.status(404).send({ message: "Person Calendar Get Failed" })
        }
        client.end
    })    

 // inserts a date into the persons calendar   
 .post(async (req, res) => {
    try {
        sql = `INSERT INTO PersonAvailableDays (P.AvailableDay, P.Person_ID) VALUES TO_DATE($1, 'YYYY/MM/DD'), $2`
        const person_id = req.body.person_id;
        const date = req.body.year + '/' + req.body.month + '/' + req.body.days;
        let result
        result = await client.query(sql, [date, person_id]);
        res.status(200).send({ message: "Succesfully inserted into PersonAvailableDays Table" })
    } catch (err) {
        res.status(404).send({ message: "Failed insert into PersonAvailableDays Table" })
    }
})


module.exports = router