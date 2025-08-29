import React, {useState} from 'react'
import "./TodoList.css"

const TodoList = () => {
    const [task, setTask] = useState("")
    const[tasks, setTasks] = useState([])
    const[doneTasks, setDoneTasks] = useState([])

    const addTask = () => {
        if(task.trim() ==="")return 
        setTasks([...tasks, task])
        setTask("")
    }
    const markDone = (index)=>{
      const done = tasks[index]
      setDoneTasks([...doneTasks, done])
      setTasks(tasks.filter((_, i)=>i !== index))
     }
     const deleteTask = (index)=>{
        setTasks(tasks.filter((_, i) => i !== index))
     }

  return (
    <div className = "todo-container">
        <h2 className = "title">To-Do Application</h2>
        <div className = "input-section">
            <input type = "text" value={task} onChange={(e)=>setTask(e.target.value)}
            placeholder="Enter a Task" className="task-input"/>
            <button className="add-btn" onClick={addTask}>Add Task</button>
        </div>

        <h3>Task List</h3>
        <ul className = "task-list">{tasks.map((t, index) => (
            <li key = {index} className = "task-item">
                <span>{t}</span>
                <div className = " btn-group">
                    <button onClick = {()=>markDone(index)} className= "done-btn">Mark As Done</button>
                    <button onClick={() => deleteTask(index)} className="delete-btn">Delete</button>
                </div>
            </li>
        ))}
        </ul>

        <h3>Done List</h3>
        <ul className = "done-list">{doneTasks.map((d, index) => (
            <li key={index} className = "done-item">{d}</li>
        ))}</ul>
        </div>
  )
}
export default TodoList

