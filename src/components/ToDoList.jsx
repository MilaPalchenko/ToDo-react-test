import React, { useState } from 'react'
import '../styles/ToDo/style.css'
import IconUp from '../assets/arrow-up.png'
import IconDown from '../assets/arrow-down.png'
import IconTrashBin from '../assets/red-trash-can-icon.png'

function ToDoList() {

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function holdTaskLocalData(nameClass, item) {
        localStorage.setItem(nameClass, JSON.stringify([...item]));
    }

    function addTask() {
        //trim to prevent new space 
        if (newTask.trim() !== "") {
            setTasks(t => [newTask, ...t ]);
            setNewTask("");

            //update local data
            localStorage.setItem('tasks', JSON.stringify([newTask, ...tasks]));
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        holdTaskLocalData('tasks', updatedTasks);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            // "math" formula to switch two var/const parameters
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
            holdTaskLocalData('tasks', updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
            holdTaskLocalData('tasks', updatedTasks);
        }
    }


    // const handleClick = (event) => { 
    //     if(event.target.style.textDecoration){ 
    //         event.target.style.removeProperty('text-decoration');
    //     }else { 
    //         event.target.style.setProperty('text-decoration', 'line-through');
    //     }  
    // }

    //figure this out more detailed
    React.useEffect(() => {
        const storedTodos = localStorage.getItem('tasks');
        if (storedTodos) {
            setTasks(JSON.parse(storedTodos));
        }
    }, []);

    return (<div className='to-do-list'>

        <h1>To-Do-List</h1>
        <div>
            <div className="wrap-input">
                <div className="wrap">
                    <div className="container">
                        <div className="entry-area">
                            <input type="text"
                                required
                                // placeholder="Enter a task..."
                                value={newTask}
                                onChange={handleInputChange}
                                className='input-bar'
                            />
                            <div className="label-line">Enter your task</div>
                        </div>
                    </div>
                </div>
                <button
                    className="add-button"
                    onClick={addTask}>
                    Add
                </button>
            </div>
            <ol>
                {tasks.map((task, index) =>
                    <li key={index}>
                        <span className='text'
                        // onClick={handleClick}
                        >
                            {task}
                        </span>

                        <button className="move-button"
                            onClick={() => moveTaskUp(index)}>
                            <img src={IconUp} alt=""
                                height="40px" />
                        </button>
                        <button className="move-button"
                            onClick={() => moveTaskDown(index)}>
                            <img src={IconDown} alt=""
                                height="40px"
                            />
                        </button>
                        <button className="delete-button"
                            onClick={() => deleteTask(index)}>
                            <img src={IconTrashBin} alt=""
                                height="30px" />
                        </button>
                    </li>)}
            </ol>
        </div>
    </div>);
}

export default ToDoList