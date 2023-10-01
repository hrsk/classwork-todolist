import React from "react";
import {TaskType} from "./index";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    changeTaskStatus: (taskId: number, isDone: boolean) => void
}
export const Todolist = (props: PropsType) => {

    const removeTask = (taskId: number) => {
        props.removeTask(taskId)
    }
    const changeTaskStatus = (taskId: number, isDone: boolean) => {
        props.changeTaskStatus(taskId, isDone)
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
                    props.tasks.map(task => {
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
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}