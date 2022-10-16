//Database programming is done asynchronously so promises are used
const mysql = require('mysql2/promise')
//location of config file
const config = require('../config')

async function query(sql, params) {
    const connection = await mysql.createConnection(config.db)
    const[result,] = await connection.execute(sql,params)
}

module.exports = { query }