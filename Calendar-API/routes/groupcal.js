const express = require('express')
const router = express.Router()
const client = require('../initDB')

// Returns all group’s available days (for debugging)
router.get('/', (req, res) => {
    client.query(`SELECT * FROM GroupAvailableDays`, (err, result) => {
        try{
          res.json(result.rows);   
        }catch(err){
          res.send(err.message);  
        }
    })
    client.end
})

// returns all colors for each day
router.get('/color', (req, res) => {
    const sql = `SELECT G.Available_Day, C.Color_Name FROM Color C JOIN GroupAvailableDays G ON (C.Number_People = G.Num_People)`;
    client.query(sql, (err, result) => {
        try{
           res.json(result.rows);
        }catch(err){
           res.send("Error message: " + err.message); 
        }
    })
})

// update a color given a date
router.put('/updateColor', (err, result) => {
    try{
        const date = new Date(req.body.year, req.body.month-1, req.body.days);
        const sql = `UPDATE GroupAvailableDays SET Num_People = 
        (((SELECT Num_People FROM GroupAvailableDays WHERE Available_Day = ${date}) + 1) % 4) WHERE Available_Day = ${date}`;
         client.query(sql, (err2, result) => {
            try{
              res.status(202).send({message: `Successful update to the color of ${date}`});  
            }catch(err){
              res.send(err2.message);  
            }
         })
    }catch(err){
        res.send(err.message);
    }
})


router.get('/:group_code', (req, res) => {
   const sql = `SELECT J.PersonID FROM GroupMembers J WHERE (J.Group_Code = ${req.params.group_code})`;
   client.query(sql, (err, result) => {
       try{
          res.json(result.rows);          
       }catch(err){
          res.send(err.message); 
       }
   }) 
})

// Returns available days of the group specified 
router.route('/:groupcode')
    .get(async (req, res) => {
        try {
            const sql = `SELECT Available_Day FROM GroupAvailableDays WHERE Group_Code = $1`
            const groupcode = req.params.groupcode
            let response
            response = await client.query(sql, [groupcode])
            if (response.rowCount > 0) {
                res.status(200).send(response.rows);
            } else {
                res.status(404).send("Group with given groupcode has no available days");
            }
        } catch (err) {
            res.status(404).send({ message: "Person Calendar Get Failed" })
        }
    client.end
    })

// Inserts user into a group using GroupMembers table, if current amount of members 
router.post('/:group_code/:id', (req, res) => {
    const sql = `INSERT INTO GroupMembers VALUES (${req.params.group_code}, ${req.params.id})`
    client.query(sql, (err, result) => {
        try{
           res.status(202).send({message: "Successful insert into groupmember"}); 
        }catch(err){
           res.send(err.message); 
        }
    })
})


/*
    .post(async (req, res) => {
        try {
            const sql = `INSERT INTO GroupMembers FROM GroupAvailableDays WHERE Group_Code = $1`
            const groupcode = req.params.groupcode
            let response
            response = await client.query(sql, [groupcode])
            if (response.rowCount > 0) {
                res.status(200).send(response.rows);
            } else {
                res.status(404).send("Group with given groupcode has no available days");
            }
        } catch (err) {
            res.status(404).send({ message: "Person Calendar Get Failed" })
        }
        client.end
    })
*/

module.exports = router