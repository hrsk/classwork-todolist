import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {FilterValuesType, TaskType, TodolistType} from "./index";
import {v1} from 'uuid';

export const App = () => {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
    ]);

    const [lists, setLists] = useState<Array<TodolistType>>([
        {id: v1(), title: 'What to learn', filter: 'All'},
        {id: v1(), title: 'What to buy', filter: 'All'},
    ]);

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        setTasks(tasks.map(task => task.id === taskId ? {...task, isDone} : task))
    }

    const changeTaskFilter = (filter: FilterValuesType) => {
        // setFilter(filter)
    }

    const addTask = (value: string) => {
        setTasks([...tasks, {id: v1(), title: value, isDone: false}])
    }

    return (
        <div className="App">
            {
                lists.map(todolist => {
                        return (
                            <Todolist key={todolist.id}
                                      title={todolist.title}
                                      tasks={tasks}
                                      removeTask={removeTask}
                                      changeTaskStatus={changeTaskStatus}
                                      filter={todolist.filter}
                                      changeFilter={changeTaskFilter}
                                      addTask={addTask}
                            />
                        )
                    }
                )}
        </div>
    );
}
