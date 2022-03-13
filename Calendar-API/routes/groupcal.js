const express = require('express')
const router = express.Router()
const client = require('../initDB')


router.get('/', (req, res) => {
    client.query(`SELECT Available_Day FROM GroupAvailableDays`, (err, result) => {
        res.json(result.rows);
    })
    client.end
})

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

//not close to being done
router.route('/:groupcode/:id')
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


module.exports = router