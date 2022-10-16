import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

const URL = 'http://localhost:3001/'

function App() {

  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState('')




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
          <li key={task.id}>{task.description}<a href = "#" onClick={() => remove(task.id)}> Delete </a></li>
        ))}
      </ol>
    </div>
  );
}

export default App;
