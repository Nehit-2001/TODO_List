import React, { useState, useEffect } from "react"
import "./App.css";


function App() {
  
  const [tasks, setTask] = useState([]);
  const [input, setInput] = useState("");

  // Load tasks from localStorage when app starts
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTask(savedTasks);
  }, []);

   // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if(input.trim()){
      setTask([...tasks, {id:Date.now(), text:input, completed:false}]);
      setInput("");
    }
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
        <div className="bg-white shadow-lg rounded-2xl p-16">
          <h1 className="font-bold text-4xl text-center text-gray-700 mb-10">TODO list App ✔️</h1>

          <div className="flex mb-4">

            <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Add a new Task" className="flex-grow px-3 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>

            <button onClick={addTask} className="rounded-r-lg p-4 font-medium text-white bg-blue-500">Add</button>
          </div>

           <ul className="space-y-2">
            {
              tasks.map((task)=>(
                <li key={task.id} className="flex items-center p-3 rounded-lg bg-slate-100 border border-gray-200">
                  <input type="checkbox" checked={task.completed} onChange={()=> setTask(
                    tasks.map((t) =>(
                      t.id === task.id ? {...t, completed: !t.completed} : t
                    ))
                  )} 
                  className="mr-2 h-5 w-5 text-blue-500"/>
                  <span className={`flex-grow ${task.completed ? "line-through text-gray-500" : "text-gray-400"}`}>{task.text}</span>

                  <button onClick={()=> setTask(tasks.filter((t)=> t.id !== task.id))} className="ml-2 border-none p-2 rounded-lg bg-red-500 text-white hover:bg-red-600">Delete</button>

                </li>
              ))
            }
           </ul>
        </div>
      </div>
    </>
  )
}

export default App
