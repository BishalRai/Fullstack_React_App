const express = require("express")
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const port = 3001

// app.get("/",(req,res) => {
//     res.status(200).json({message: "Node server is responding"})
// })
// app.listen(port,() => {
//     console.log('Server running on port ${port}')
// })

app.listen(port)