import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export const App = (props: any) => {
    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={props.tasks}/>
        </div>
    );
}
