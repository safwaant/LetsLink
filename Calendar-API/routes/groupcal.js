const express = require('express')
const router = express.Router()
const client = require('../initDB');
const ColorDAO = require('../model/colorDAO');
const GroupDAO = require('../model/groupDAO');
let groupDAO = new GroupDAO();
let colorDAO = new ColorDAO();
router.route('/')
// Returns all group’s available days (for debugging)
.get(async (req, res) => {
    let response = await groupDAO.getAllGroupAvailDays();
    res.json(response.rows);
})
// Creates new group
.post((req, res) => {
    try {

        const group = JSON .parse(req.body);
        const groupInfo = {
            group_code : req.body.group_code,
            group_name: req.body.group_name,
            creator_name: req.body.creator_id,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            max_members: req.body.max_members
        };
        const sql = `INSERT INTO calendargroup (group_code, group_name, creator_name, group_start, group_end, member_count) VALUES
                    (${groupInfo.group_code}, '${groupInfo.group_name}', '${groupInfo.creator_name}', TO_DATE('${groupInfo.start_date}','YYYYMMDD'),
                    TO_DATE('${groupInfo.end_date}','YYYYMMDD'), ${groupInfo.max_members})`;
        client.query(sql)
        res.status(202).send({ message: `Successfully created group` });  
    } catch (err) {
        res.status(404).send({ message: `Group creation Unsuccesful: ` + err.message });  
    }
    client.end
})

// Get all groups
router.get('/all', async (req, res) => {
    let response = await groupDAO.getAllGroupData();
    res.json(response.rows);
});

// returns all colors for each day
router.get('/color/:group_code/:date', async (req, res) => {
    let response = await colorDAO.getColorForDay(req.params.group_code, req.params.date);
    res.json(response.rows);
});


// returns all possible days
router.get('/daysToMeet/:group_code', async (req, res) => {
    let response = await groupDAO.getDaysToMeet(req.params.group_code);
    res.json(response.rows);
});


// Returns available days of the group specified 
router.route('/:groupcode')
    .get(async (req, res) => {
        const groupcode = req.params.groupcode;
        let response = await groupDAO.getGroupAvailableDays(groupcode);
        res.json(response.rows);
});

// get all members in a specific group
router.get('/members/:group_code', async (req, res) => {
    let response = await groupDAO.getGroupMembers(req.params.group_code);
    res.json(response.rows); 
 });


// Inserts user into a group using GroupMembers table, if current amount of members 
router.post('/addUser', (req, res) => {
    try {
        const person_id = req.body.person_id
        const group_code = req.body.group_code
        /*
        const checkMax = `SELECT calendargroup.group_code, member_count, member_amount
                            FROM calendargroup
                            JOIN ( SELECT GroupMembers.group_code, COUNT(*) AS member_amount
                            FROM Groupmembers
                            GROUP BY GroupMembers.group_code
                            HAVING GroupMembers.group_code = ${group_code}
                            ) AS Table1 ON (Table1.group_code = calendargroup.group_code)`
        client.query(checkMax, (err, result) => {
            if (err || result.rowCount == 0) {
                res.send("Group is Full or does not exist: " + err.message);
            }
        })
        const checkDuplicate = `SELECT * FROM GroupMembers WHERE group_code = ${group_code} AND personid = ${person_id}`
        client.query(checkDuplicate, (err, result) => {
            if (err || result.rowCount > 0) {
                res.send("Person is already in group");
            }
        })
        */
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