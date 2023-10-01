import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {TaskType, TodolistType} from "./index";


export const App = () => {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
    ]);

    const lists: Array<TodolistType> = [
        {id: 1, title: 'What to learn'},
        // {id: 2, title: 'What to buy'},
    ];

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }

    const changeTaskStatus = (taskId: number, isDone: boolean) => {
        setTasks(tasks.map(task => task.id === taskId ? {...task, isDone} : task))
    }

    return (
        <div className="App">
            {lists.map(todolist =>
                <Todolist key={todolist.id}
                          title={todolist.title}
                          tasks={tasks}
                          removeTask={removeTask}
                          changeTaskStatus={changeTaskStatus}
                />
            )}
        </div>
    );
}
