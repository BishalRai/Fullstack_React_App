const express = require("express")
const cors = require('cors')

// //Database programming is done asynchronously so promises are used
// const mysql = require('mysql2/promise')
// //location of config file
// const config = require('./config')

//importing db js file here
const db = require('./services/db')


const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const port = 3001

//for display

app.get("/",async function (req,res) {
    try{
        //const connection = await mysql.createConnection(config.db)
        //const [result,] = await connection.execute('select * from task')

        //routes do not call database straight on, they call database using querry function from db
        const result = await db.query('select * from task')

        //if there is no data,this will return empty array
        if(!result) result = [] 
        res.status(200).json(result)

    }catch(err){
        //return status code 500 and error message to the client.
        res.status(500).json({error: err.message})
    }
})

//for insert purpose
app.post("/new",async function(req,res){
    try{
        const connection = await mysql.createConnection(config.db)
        //Execute prepared statement
        const [result,] = await connection.execute('insert into task (description) values(?)',[req.body.description])
        res.status(200).json({id:result.insertId})
    } catch(err) {
        res.status(500).json({error: err.message})
    }
})

//for deletion
app.delete("/delete/:id", async function(req, res){
    try{
        const connection = await mysql.createConnection(config.db)
        //Execute prepared statement.
        await connection.execute('delete from task where id = ?',[req.params.id])
        res.status(200).json({id:req.params.id})
    }catch(err){
        res.status(500).json({error: err.message})
    }
})

app.listen(port)