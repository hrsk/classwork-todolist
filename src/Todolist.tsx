import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {TaskType} from "./index";
import {FilterValuesType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    changeFilter: (filter: FilterValuesType) => void
    addTask: (value: string) => void
}
export const Todolist = (props: PropsType) => {

    const [value, setValue] = useState<string>('');

    const removeTask = (taskId: string) => {
        props.removeTask(taskId)
    }
    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        props.changeTaskStatus(taskId, isDone)
    }

    const changeTaskFilter = (filter: FilterValuesType) => {
        props.changeFilter(filter)
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value)
    }

    const addTask = () => {
        if (value.trim() !== null) {
            props.addTask(value)
            setValue('')
        }
    }

    const onKeyPressHandler = (event: KeyboardEvent) => {
        if (event.key === 'Enter' && event.metaKey) {
            addTask()
        }
    }

    let filteredTasks = props.tasks

    if (props.filter === 'Completed') {
        filteredTasks = props.tasks.filter(task => task.isDone)
    }
    if (props.filter === 'Active') {
        filteredTasks = props.tasks.filter(task => !task.isDone)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={value} onChange={onChangeHandler} onKeyDown={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul style={{listStyle: 'none'}}>
                {
                    filteredTasks.map(task => {
                            return (
                                <li key={task.id}>
                                    <button onClick={() => removeTask(task.id)}>x</button>
                                    <input type="checkbox"
                                           checked={task.isDone}
                                           onChange={(e) => changeTaskStatus(task.id, e.currentTarget.checked)}/>
                                    <span className={task.isDone ? 'is-done' : ''}>{task.title}</span>
                                </li>
                            )
                        }
                    )
                }
            </ul>
            <div>
                <button className={props.filter === 'All' ? 'active' : ''}
                        onClick={() => changeTaskFilter('All')}>All
                </button>
                <button className={props.filter === 'Active' ? 'active' : ''}
                        onClick={() => changeTaskFilter('Active')}>Active
                </button>
                <button className={props.filter === 'Completed' ? 'active' : ''}
                        onClick={() => changeTaskFilter('Completed')}>Completed
                </button>
            </div>
        </div>
    )
}
