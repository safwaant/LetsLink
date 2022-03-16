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

 // inserts a date into the persons calendar   
 router.post('/add', async (req, res) => {
    try {
        const person_id = req.body.person_id;
        //const date = req.body.year + '-' + req.body.month + '-' + req.body.days;
        const date = new Date(req.body.year, req.body.month-1, req.body.days);
        sql = `INSERT INTO PersonAvailableDays (Person_AvailableDay, Person_ID) VALUES ($1, ${person_id})`
        let result
        result = await client.query(sql, [date]);

        // find which group the person is in
        const sqlGroup = `SELECT G.Group_Code FROM CalendarGroup G 
        JOIN GroupMembers GM ON (G.Group_Code = GM.Group_Code) 
        JOIN Person P ON P.ID = GM.PersonID WHERE P.ID = ${person_id}`
        let group_id;
        client.query(sqlGroup, (err, result) => {
            group_id = result.json.group_code;
        })

        const checkDate = `SELECT G.Available_Day FROM GroupAvailableDay G WHERE Available_Day = ${date}`;
        client.query(checkDate, (err, result) => {
              if(!err && result.rowCount === 0){
                  // update the color   
                  // insert into calendar 
                 client.query(`INSERT INTO GroupAvailableDays (Group_Code, Available_Day, Num_People)`) 
               } else {
                  res.send("Error could not insert into Person Calendar: " + err.message); 
               }  
        })
        res.status(200).send({ message: "Successfully inserted into PersonAvailableDays Table" })
    } catch (err) {
        res.status(404).send({ message: "Failed insert into PersonAvailableDays Table" })
    }
})


// Retrieves all available days for the specified person. The parameter is person id
router.route('/:id')
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




module.exports = router