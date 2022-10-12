import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

const URL = 'http://localhost:3001/'

function App() {

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    axios.get(URL)
      .then((response) => {
        setTasks(response.data)
      }).catch(error => {
        alert(error.response.data.error)
      })
  }, [])


  return (
    <div>
      <h3>My Tasks</h3>
      <ol>
        {tasks.map(task => (
          <li key = {task.id}>{task.description}</li>
        ))}
      </ol>
    </div>
  );
}

export default App;
