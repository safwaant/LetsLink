const {Client} = require('pg')
const dotenv = require('dotenv') 
dotenv.config()
const password = process.env.PASSWORD;

//console.log('Before Creating Client');
const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: `${password}`,
    database: "calendar"
})
//console.log('After Creating Client');
module.exports = client