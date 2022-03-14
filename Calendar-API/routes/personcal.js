const express = require('express');
const router = express.Router()
const client = require('../initDB');


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
  
/*    
.post('/add/:id/:day/:month/:year', (req, res) => {
    client.query(`SELECT P.AvailableDay FROM PersonAvailableDays
     P WHERE P.AvailableDay = ${req.params.date}`, (err, result) => {
           if(result.rowCount > 0){
             const person = result.rows;   
             client.query(`INSERT INTO PersonAvailableDays (P.AvailableDay, P.Person_ID) VALUES ${date}, ${id}`)  
           } 
      })   
})
*/

module.exports = router