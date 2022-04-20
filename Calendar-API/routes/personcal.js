const express = require('express');
const { reset } = require('nodemon');
const router = express.Router()
const client = require('../initDB');
const PersonCalDAO = require('../model/personAvailDAO');
let personCalDAO = new PersonCalDAO();

router.route('/')
// Returns every single person available day
.get('/', async (req, res) => {
    let response = await personCalDAO();
    res.json(response.rows);
})
//adds person available day to 
.post('/add', (req, res) => {
    const person_id = req.body.person_id;
    const date = req.body.date;
    const sql = `INSERT INTO PersonAvailableDays (Person_AvailableDay, Person_ID) VALUES (TO_DATE('${date}','YYYYMMDD'), ${person_id})`;
    client.query(sql, (err, result) => {
        try {
            sql2 = `INSERT INTO GroupAvailableDays (num_people, available_day, group_code)
                SELECT 1, TO_DATE('${date}','YYYYMMDD'), Table1.group_code
                FROM (SELECT group_code
                FROM person
                JOIN groupmembers ON (groupmembers.personid = person.id)
                WHERE Person.id = ${person_id}
                ) AS Table1
                ON CONFLICT (group_code, available_day) DO
                UPDATE SET num_people = groupavailabledays.num_people + 1;`
            client.query(sql2)
            res.status(200).send("Succesfully added day")
        } catch (err) {
            res.status(404).send("Day adding unsuccesful:" + err.message)
        }
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

/*
// revised insert date into person calendar code
router.post('/add', (req, res) => {
    const person_id = req.body.person_id,
    date = new Date(req.body.year, req.body.month-1, req.body.days);
    const sql =  `INSERT INTO PersonAvailableDays (Person_AvailableDay, Person_ID) VALUES (${date}, ${person_id})`;
    client.query(sql, (err, result) => {
        try{
              const sqlGroup = `SELECT G.Group_Code FROM CalendarGroup G 
              JOIN GroupMembers GM ON (G.Group_Code = GM.Group_Code) 
              JOIN Person P ON P.ID = GM.PersonID WHERE P.ID = ${person_id}`
              let group_id;  
              client.query(sqlGroup, (err, result) => {
                  try{
                    async function checkDuplicate(){
                        const select = `SELECT G.Available_Day FROM GroupAvailableDays G WHERE (G.Available_Day = ${date})`;
                        client.query(select, (err, result) => {
                            if(result.rows > 0){
                               return true; 
                            } 
                            return false;
                        })
                      }
                      let check = await checkDuplicate();
                      if(check){
                          // add a new row
                        const sql2 = `INSERT INTO CalendarGroup G VALUES (${group_code}, ${date}, 1)`;
                        client.query(sql2, (err, result) => {
        
                        })
                      }
                  }catch(err){
                    group_id = result.json.group_code;
                  }
              })
        }catch(err){
           res.send(err.message); 
        }
    })
})
*/


/*
 // inserts a date into the persons calendar   
 router.post('/add', async (req, res) => {
    try {
        const person_id = req.body.person_id;
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
                 client.query(`INSERT INTO GroupAvailableDays (Group_Code, Available_Day, Num_People)`, (err, result) => {
                    try{
                      res.status(202).send({message: "Succesful insert into group calendar"});  
                    }catch(err){
                      res.send(err.message);  
                    } 
                 }) 
               } else {
                  res.send("Error could not insert into Person Calendar: " + err.message); 
               }  
        })
        res.status(200).send({ message: "Successfully inserted into PersonAvailableDays Table" })
    } catch (err) {
        res.status(404).send({ message: "Failed insert into PersonAvailableDays Table" })
    }
})
*/

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
                res.status(404).send("No available days with given Person ID");
            }
        } catch (err) {
            res.status(404).send({ message: "Person Calendar Get Failed" })
        }
        client.end
    })    




module.exports = router