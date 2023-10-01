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
    return (
        <div className="App">
            {lists.map(todolist =>
                <Todolist key={todolist.id}
                          title={todolist.title}
                          tasks={tasks}
                          removeTask={removeTask}
                />
            )}
        </div>
    );
}
