const client = require('./connection.js')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const port = 3000
app.listen(port, () => {
    console.log(`We running at port ${port} les get itttttttt`)
})

app.use(bodyParser.json())


client.connect();
setTimeout(() => {
    console.log('Host: ' + client.host + '\nPort: ' + client.port + '\nUser: ' + client.user + '\nDatabase: ' + client.database)
}, 200)



app.get('/meeting', (req, res)=>{
    client.query(`SELECT * FROM meeting`, (err, result)=>{
        if(!err){
            res.send(result.rows)
        }
        console.log(req.baseUrl)
    })
    client.end
})


