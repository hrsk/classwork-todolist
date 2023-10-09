import React from "react";
import {TaskType} from "./index";
import {FilterValuesType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    changeTaskStatus: (taskId: number, isDone: boolean) => void
    filter: FilterValuesType
    changeFilter: (filter: FilterValuesType) => void
}
export const Todolist = (props: PropsType) => {

    const removeTask = (taskId: number) => {
        props.removeTask(taskId)
    }
    const changeTaskStatus = (taskId: number, isDone: boolean) => {
        props.changeTaskStatus(taskId, isDone)
    }

    const changeTaskFilter = (filter: FilterValuesType) => {
        props.changeFilter(filter)
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
                <input/>
                <button>+</button>
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
                                    <span>{task.title}</span>
                                </li>
                            )
                        }
                    )
                }
            </ul>
            <div>
                <button onClick={() => changeTaskFilter('All')}>All</button>
                <button onClick={() => changeTaskFilter('Active')}>Active</button>
                <button onClick={() => changeTaskFilter('Completed')}>Completed</button>
            </div>
        </div>
    )
}