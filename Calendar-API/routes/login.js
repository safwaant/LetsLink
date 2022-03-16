const { query } = require('express');
const express = require('express');
const client = require('../initDB');
const router = express.Router()

// Returns every username, password, and id (for debugging)
router.get('/', (req, res) => {
    //ask safwaan what this is for
   client.query(`SELECT P.Person_Name FROM Person P`, (err, result) => {
      res.json(result.rows) 
   }) 
   client.end
})

// Updates the user’s password
router.put('/forgot/:username/:newpassword', (req, res) => {
    client.query(`UPDATE Person P SET P.Person_Password = '${req.params.newpassword}' WHERE P.Person_Name = ${req.params.username}`)
})

// Returns the user’s id
router.route('/:username/:password')
    .get(async (req, res) => {
        try {
            const sql = `SELECT id FROM person WHERE person_name = $1 AND person_password = $2`
            const { username, password } = req.params
            let response
            response = await client.query(sql, [username, password])
            console.log(response.rowCount)
            if (response.rowCount > 0) {
                res.status(200).send(response.rows);
            } else {
                try {
                    const sql2 = "INSERT INTO Person (person_name, person_password) VALUES ($1, $2)"
                    client.que
                } catch (error) {
                    res.status(404).send({ message: "User does not exist, failed insert into Person Table" })
                }
            }
        } catch (err) {
            res.status(404).send({ message: "User Get Failed" })
        }
    client.end
    })
    // create a new user
    .post((req, res) => {
        client.query(`INSERT INTO Person P (Person_Name, Person_Password) VALUES (${req.params.username}, ${req.params.password})`, (err, result) => {
            if(err){
              res.status(404).send({message: "Insert into Person Table failed"});  
            } else {
              res.status(200).send({ message: "User does not exist, inserted into Person Table"});  
            }
        })

    client.end
    })



module.exports = router;