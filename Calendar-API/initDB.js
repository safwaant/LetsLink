const {Client} = require('pg')
const dotenv = require('dotenv') 
dotenv.config()
const password = process.env.PASSWORD;

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: `${password}`,
<<<<<<< Updated upstream:Calendar-API/initDB.js
    database: "postgres"
=======
    database: "calendar"
>>>>>>> Stashed changes:backend/connection.js
})

module.exports = client