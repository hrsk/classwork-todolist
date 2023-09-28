import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {TaskType, TodolistType} from "./index";

type PropsType = {
    tasks: Array<TaskType>
    lists: Array<TodolistType>
}

export const App = (props: PropsType) => {
    return (
        <div className="App">
            {props.lists.map(todolist =>
                <Todolist key={todolist.id}
                          title={todolist.title}
                          tasks={props.tasks}/>
            )}
        </div>
    );
}
