import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

const URL = 'http://localhost:3001/'

function App() {

  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState('')
//for edit purpose define state variable 
  const [editTask, setEditTask] = useState(null)
  const [editDescription, setEditDescription] = useState('')



//function for insert
function save(){
  // const json = JSON.stringify({fname: detail}{lname:detail})
  const json = JSON.stringify({description: task})
  axios.post(URL + 'new', json,{
    headers: {
      'Content-Type' : 'application/json'
    }
  })
  .then((response) => {
    //Convert stringifyed JSON object back to Javascript object.
    const addedObject = JSON.parse(json)
    //Add id returned by the server to object.
    addedObject.id = response.data.id
    //Update state variable with newly added data.
    setTasks(tasks => [...tasks, addedObject])
    //Detail state variable is emptied so user can start adding another task without deletion of previous info on the form
    setTask('')
  }).catch(error => {
    alert(error.response.data.error)
  })
}



//Function for Deletion
function remove(id){
  axios.delete(`${URL}delete/${id}`) //here not a quotation mark but use a back tick
  .then(()=>{
    const newListWithoutRemoved = tasks.filter((item) => item.id !== id)
    setTasks(newListWithoutRemoved)
  }).catch(error =>{
    alert(error.response.data.error)
  })
}

//Function definition for retrieving a data in Update box from database.
function setEditableRow(task) {
  setEditTask(task)
  setEditDescription(task.description)
}

  useEffect(() => {
    axios.get(URL)
      .then((response) => {
        setTasks(response.data)
      }).catch(error => {
        alert(error.response.data.error)
      })
  }, [])


  return (
    <div style={{ margin: '20px' }}>
      <h3>My Tasks</h3>
    {/* form for submission and deletion of info */}

    <label>Add New </label> 
    <form>
    <input value ={task} onChange = {e => setTask(e.target.value)}></input>
    <button type = 'button' onClick={save}> Save </button>
    </form>
   
      <ol>
         {/* adding HyperLink in each line for deletion of that line */}
         {tasks.map(task => (
          <li key={task.id}>
            {editTask?.id !== task.id && 
              task.description + ' '
            }
            {editTask?.id === task.id &&
              <form>
                <input value = {editDescription} onChange = {e => setEditDescription(e.target.value)} />
                <button type = "button" onClick={null}>Save</button>
                <button type='button' onClick={() => setEditTask(null)}>Cancel</button>
              </form>
            }
            <a href = "#" onClick={() => remove(task.id)}> Delete </a>&nbsp;
            { editTask === null &&
              <a href ="#" onClick={() => setEditTask(task)}>Edit</a>
            }
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
