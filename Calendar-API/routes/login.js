const { query } = require('express');
const express = require('express');
const client = require('../initDB');
const router = express.Router()

//duplicate of person
// Returns every username, password, and id (for debugging)
router.get('/', (req, res) => {
    //ask safwaan what this is for
   client.query(`SELECT * FROM Person P`, (err, result) => {
      res.json(result.rows) 
   }) 
   client.end
})

//MARK FOR REMOVAL
// Updates the user’s password
router.put('/forgot', (req, res) => {
    const newInfo = { username : req.body.username, newPassword : req.body.newPassword };
    client.query(`UPDATE Person P SET P.Person_Password = '${newPassword}' WHERE P.Person_Name = '${username}'`, (err, result) => {
        try{
            res.status(202).send("Successful update to the Specified Person");
        }catch(err){
            res.send(err.message);
        }
    })
})

// Creates a new user
router.post('/newUser', (req, res) => {
        const loginInfo = {
          newUsername : req.body.username,
          newPassword : req.body.password
        };
        const addUserQuery = `INSERT INTO Person (Person_Name, Person_Password) VALUES ('${loginInfo.newUsername}', '${loginInfo.newPassword}')`;
        client.query(addUserQuery, (err, result) => {
            if(!err){
                res.status(200).send({ message: "Success! inserted into Person Table"});    
            } else {
                res.send("Could not be inserted into person table: " + err.message);  
            }
        })

    client.end
})


// Returns the user’s id
router.route('/:username/:password')
    .get(async (req, res) => {
        const info = { 
            username : req.params.username, 
            password : req.params.password
        };
        console.log(info.username)
        console.log(info.password)
        const sql = `SELECT id FROM person WHERE person_name = '${info.username}' AND person_password = '${info.password}'`
        client.query(sql, (err, result) => {
            if (!err) {
                console.log("hi")
                res.status(200).json(result.rows);
            } else  {
                res.send("Error postgres: " + err.message);
            }
        })
    client.end
    })


module.exports = router;