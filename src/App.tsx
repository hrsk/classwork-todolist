import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {TaskType} from "./index";

type PropsType = {
    tasks: Array<TaskType>
}

export const App = (props: PropsType) => {
    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={props.tasks}/>
        </div>
    );
}
