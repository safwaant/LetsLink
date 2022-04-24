const express = require('express')
const router = express.Router()
const client = require('../initDB');
const ColorDAO = require('../model/colorDAO');
const GroupAvailDAO = require('../model/groupAvailDAO');
const GroupDAO = require('../model/groupDAO');


let groupDAO = new GroupDAO();
let colorDAO = new ColorDAO();
let groupAvailDAO = new GroupAvailDAO();


router.route('/')
// Returns all group’s available days (for debugging)
.get(async (req, res) => {
    let response = await groupAvailDAO.getAllGroupAvailDays();
    res.json(response.rows);
})
// Creates new group
.post((req, res) => {
    const groupInfo = req.body;
    let response = groupDAO.insertNewGroup(groupInfo);
    res.send(response);
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
    let response = await groupAvailDAO.getDaysToMeet(req.params.group_code);
    res.json(response.rows);
});


// Returns available days of the group specified 
router.route('/:groupcode')
    .get(async (req, res) => {
        const groupcode = req.params.groupcode;
        let response = await groupAvailDAO.getGroupAvailableDays(groupcode);
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
        const group_code = req.body.group_cod;
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

module.exports = router