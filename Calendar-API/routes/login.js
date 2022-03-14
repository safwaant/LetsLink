const { query } = require('express');
const express = require('express');
const client = require('../initDB');
const router = express.Router()

router.get('/', (req, res) => {
    //ask safwaan what this is for
   client.query(`SELECT P.Person_Name FROM Person P`, (err, result) => {
      res.json(result.rows) 
   }) 
   client.end
})

router.put('/forgot/:username/:newpassword', (req, res) => {
    client.query(`UPDATE Person P SET P.Person_Password = '${req.params.newpassword}' WHERE P.Person_Name = ${req.params.username}`)
})


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
                    client.query(sql2, [username, password])
                    res.status(200).send({ message: "User does not exist, inserted into Person Table" });
                } catch (error) {
                    res.status(404).send({ message: "User does not exist, failed insert into Person Table" })
                }
            }
        } catch (err) {
            res.status(404).send({ message: "User Get Failed" })
        }
    client.end
    })
    .post((req, res) => {
        try {
            const sql2 = "INSERT INTO Person (person_name, person_password) VALUES ($1, $2)"
            client.query(sql2, [username, password])
            res.status(200).send({ message: "User does not exist, inserted into Person Table" });
        } catch (error) {
            res.status(404).send({ message: "Failed insert into Person Table" })
        }
    client.end
    })



module.exports = router;