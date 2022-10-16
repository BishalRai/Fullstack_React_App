const db = require('./db')
const helper = require('../helper')

async function getAllTasks() {
    const rows = await db.query('select * from task')
    return helper.emptyOrRows(rows)
}