import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './App';
import reportWebVitals from './reportWebVitals';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type TodolistType = {
    id: number
    title: string
}

const tasks: Array<TaskType> = [
    {id: 1, title: 'HTML&CSS', isDone: true},
    {id: 2, title: 'JS', isDone: true},
    {id: 3, title: 'React', isDone: false},
    {id: 4, title: 'Redux', isDone: false},
];

const lists: Array<TodolistType> = [
    {id: 1, title: 'What to learn'},
    {id: 2, title: 'What to buy'},

];

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <App tasks={tasks} lists={lists}/>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
