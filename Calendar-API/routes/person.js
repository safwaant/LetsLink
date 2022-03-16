const { query } = require('express');
const express = require('express');
const router = express.Router();
const client = require('../initDB');

// Returns every single person on the table
//    (used for debugging and hidden from the end user)
router.get('/', (req, res) => {
   client.query(`SELECT * FROM person`, (err, result)=>{
        if(err){
          res.send(err.message); 
        } else {
         res.json(result.rows);  
        }
      })
   client.end  
})

// Returns a person's id based on the person's name
router.get('/id/:person_name', (req, res) => {
   client.query(`SELECT P.id FROM Person P WHERE P.Person_Name = '${req.params.person_name}'`, (err, result) => {
      res.json(result.rows);
   })
   client.end
})

router.get('/id/:username', (req, res) => {
   client.query(`SELECT Person_Name FROM Person JOIN GroupMembers ON (Person.id = GroupMembers.person_id) 
   WHERE Person.Person_Name = '${req.params.username}'`, (err, result) => { 
      res.json(result.rows);
   })
})

// Returns a person's name based on the person's id
router
.route('/:id')
.get((req, res) => {
   client.query(`SELECT P.id, P.Person_Name FROM Person P WHERE P.id = ${req.params.id}`, (err, result)=> {
     res.json(result.rows); 
   })
   client.end
})
// Deletes the user based on the id
.delete((req, res) => {
   const id = req.params.id;
   client.query(`DELETE FROM PersonAvailableDays P WHERE P.Person_ID = ${id}`, (err, result) => {
      if(err){
         res.send(err.message);
      } else {
            client.query(`DELETE FROM GroupMembers G WHERE G.PersonID = ${id}` , (err, result) => {
               if(err){
                  res.send(err.message);
               } else {
                  client.query(`DELETE FROM Person P WHERE P.id = ${id}`, (err, result) => {
                     if(err){
                        res.send(err.message);
                     } else {
                        res.status(202).send("Success");
                     }
                  })
               }
            })
         }  
      })
   client.end
})


module.exports = router;