import React, { useEffect, useState } from 'react';
import '../styles/ToDo/style.css'
import TodoItem from './TodoItem';

function TodoList() {
    const [task, setTask] = useState([]);
    const [todo, setTodo] = useState('');

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("todo"));
        if (stored) {
            setTask(stored);
        }
    }, []);

    const updateLocalStorage = (updatedTasks) => {
        localStorage.setItem("todo", JSON.stringify(updatedTasks));
        setTask(updatedTasks);
    };

    const addTodo = () => {
        if (todo.trim() !== "") {
            const newTask = {
                id: Date.now(),
                task: todo,
                completed: false
            };
            const updatedTasks = ([newTask, ...task]);
            updateLocalStorage(updatedTasks);
            setTodo('');
        }
    };

    const deleteTask = (id) => {
        const updatedTasks = task.filter(item => item.id !== id);
        updateLocalStorage(updatedTasks);
    }

    const toggleTodo = (id) => {
        const updatedTasks = task.map((item) =>
            item.id === id ? { ...item, completed: !item.completed } : item);
        updateLocalStorage(updatedTasks);
    }

    const moveTaskUp = (index) => {
        if (index > 0) {
            const updatedTasks = [...task];
            // "math" formula to switch two var/const parameters
            [updatedTasks[index], updatedTasks[index - 1]] 
            = [updatedTasks[index - 1], updatedTasks[index]];
            updateLocalStorage(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < task.length - 1) {
            const updatedTasks = [...task];
            [updatedTasks[index], updatedTasks[index + 1]] 
            = [updatedTasks[index + 1], updatedTasks[index]];
            updateLocalStorage(updatedTasks);
        }
    }

    return (
        <div className='to-do-list'>
            <h1>To-Do-List</h1>
            <div>
                <div className="wrap-input">
                    <div className="wrap">
                        <div className="container">
                            <div className="entry-area">
                                <input
                                    className='input-bar'
                                    onChange={e => setTodo(e.target.value)}
                                    required
                                    type='text'
                                    value={todo}
                                />
                                <div className="label-line">
                                    Enter your task
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        className="add-button"
                        onClick={addTodo}>
                        Add
                    </button>
                </div>
                <ol>
                    {task.map((item,index)=> (
                        <TodoItem
                            key={item.id}
                            item={item}
                            onDelete={deleteTask}
                            onToggle={toggleTodo}
                            onUp={(() => moveTaskUp(index))}
                            onDown={(() => moveTaskDown(index))}
                        />
                    ))}
                </ol>
            </div>
        </div>
    );
}
export default TodoList;