const db = require('./db')
const helper = require('../helper')


//READ of CRUD operation
async function getAllTasks() {
    const rows = await db.query('select * from task')
    return helper.emptyOrRows(rows)
}


//CREATE of CRUD operation
async function addTask(task) {
    const result = await db.query(`insert into task (description) values ('${task.description}')`) //here is back tick `` has use first after that '' quotation mark
    task.id = result.insertId
    return task
}

//DELETE of CURD operation
async function removeTask(id){
    const result = await db.query(`delete from task where id = ${id}`)
    return id
}

//UPDATE of CRUD operation
async function UpdateTask(task) {
    const result = await db.query(`update task set description ='${task.description}' where id=${task.id}`)
    return task;
}

module.exports = {
    getAllTasks,
    addTask,
    removeTask,
    UpdateTask
}