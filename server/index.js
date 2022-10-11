const express = require("express")
const cors = require('cors')

//Database programming is done asynchronously so promises are used
const mysql = require('mysql2/promise')
//location of config file
const config = require('./config')


const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const port = 3001

//pevious one

// app.get("/",(req,res) => {
//     res.status(200).json({message: "Node server is responding"})
// })

//16 number changes here
// creating route for where i open database connection

app.get("/",async function (req,res) {
    try{
        const connection = await mysql.createConnection(config.db)
        res.status(200).send('Database connection was made')

    }catch(err){
        res.status(200).send(err.message)
    }
})

// app.listen(port,() => {
//     console.log('Server running on port ${port}')
// })

app.listen(port)