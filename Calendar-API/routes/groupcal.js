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

// Creates new group
router.post('/', (req, res) => {
    try {
        const groupInfo = {
            group_name: req.body.group_name,
            creator_name: req.body.creator_id,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            max_members: req.body.max_members
        };
        const sql = `INSERT INTO calendargroup (group_name, creator_name, group_start, group_end, member_count) VALUES
                    (${groupInfo.group_name}, ${groupInfo.creator_name}, TO_DATE('${groupInfo.start_date}','YYYYMMDD'),
                    TO_DATE('${groupInfo.end_date}','YYYYMMDD'), ${groupInfo.max_members})`;
        client.query(sql)
        res.status(202).send({ message: `Successfully created group` });  
    } catch (err) {
        res.status(404).send({ message: `Group creation Unsuccesful: ` + err.message });  
    }
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
    client.end
})

// returns all possible days
router.get('/:group_code/daysToMeet', (req, res) => {
    const sql = `SELECT available_day, num_people FROM GroupAvailableDays WHERE group_code = ${req.params.group_code} 
                                                                                    ORDER BY num_people Desc`;
    client.query(sql, (err, result) => {
        try {
            if (result.rowCount > 0) {
                res.status(200).json(result.rows);
            } else{
                res.status(404).send("No days to meet found")
            }
        } catch (err) {
            res.status(404).send("Failed to recieve daysToMeet: " + err.message);
        }
    })
    client.end
})

// update a color given a date
router.put('/updateColor', (req, res) => {
  const date = new Date(req.body.year, req.body.month-1, req.body.days);
  const sql = `UPDATE GroupAvailableDays SET Num_People = (((SELECT Num_People FROM GroupAvailableDays WHERE Available_Day = ${date}) + 1) % 4) WHERE Available_Day = ${date}`;
  client.query(sql, (err2, result) => {
    try{
      res.status(202).send({message: `Successful update to the color of ${date}`});  
    }catch(err){
      res.send(err2.message);  
    }
  })
  client.end
})

//what is this??
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
router.post('/addUser', (req, res) => {
    try {
        const person_id = req.body.person_id
        const group_code = req.body.group_code
        const checkMax = `SELECT calendargroup.group_code, member_count, member_amount
                            FROM calendargroup
                            JOIN ( SELECT GroupMembers.group_code, COUNT(*) AS member_amount
                            FROM Groupmembers
                            GROUP BY GroupMembers.group_code
                            HAVING GroupMembers.group_code = ${group_code}
                            ) AS Table1 ON (Table1.group_code = calendargroup.group_code)`
        client.query(checkMax, (err, result) => {
            if (err || result.rowCount == 0) {
                throw err("Group is Full or does not exist: " + err.message);
            }
        })
        const checkDuplicate = `SELECT * FROM GroupMembers WHERE group_code = ${group_code} AND personid = ${person_id}`
        client.query(checkDuplicate, (err, result) => {
            if (err || result.rowCount > 0) {
                throw err("Person is already in group");
            }
        })
        const sql = `INSERT INTO GroupMembers (personid, group_code) VALUES (${person_id}, ${group_code})`
        client.query(sql)
        const sql2 = `INSERT INTO GroupAvailableDays (num_people, group_code, available_day)
                        SELECT 1, ${group_code}, Table1.person_availableday
                        FROM (SELECT person_availableday
                        FROM person
                        JOIN personavailabledays ON (person.id = personavailabledays.person_id)
                        WHERE Person.id = ${person_id}
                        ) AS Table1
                        ON CONFLICT (group_code, available_day) DO
                        UPDATE SET num_people = groupavailabledays.num_people + 1;`
        client.query(sql2)
        res.status(200).send("Succesfully inserted into Group")
    }catch (err) {
        res.status(404).send("Unsuccesfully inserted into Group: " + err.message);
    }
    client.end
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