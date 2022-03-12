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
    .get((req, res) => {
        const { username, password } = req.body
        let response
        response = await client.query(`SELECT id FROM Person WHERE person_name = $1 AND person_password = $2`, [username, password]);
        if (response.rowCount > 0) {
            res.status(200).send(response.rows);
        } else {
            res.status(404).send({message: "No products found"});
        }
    })
    .post((req, res) => {
        const { username, password } = request.body
        client.query(`INSERT INTO Person (person_name, person_password) VALUES (${req.params.username}, ${req.params.password})`, (error, results) => {
            if (error) {
                throw error
                res.status(404).send('Insert did not work')
            }
            res.status(201).send('User added with ID: ')
        })
    client.end
})

module.exports = router;