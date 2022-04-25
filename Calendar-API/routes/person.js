const { query } = require('express');
const express = require('express');
const router = express.Router();
const client = require('../initDB');

// Returns every single person on the table
//    (used for debugging and hidden from the end user)
router.get('/', (req, res) => {
   client.query(`SELECT * FROM person`, (err, result)=>{
        try{
         res.json(result.rows);   
        } catch(err) {
         res.send(err.message);   
        }
      })
   client.end  
})
// get group available data for a person


// add route to return the id given username

router
.route('/:id')
.get((req, res) => {
   client.query(`SELECT P.Person_Name FROM Person P WHERE P.id = ${req.params.id}`, (err, result)=> {
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