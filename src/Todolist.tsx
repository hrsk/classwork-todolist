import React, { ChangeEvent, useState, KeyboardEvent } from "react"
import { FilterValuesType, TasksType } from "./App"

type PropsType = {
    title: string
    tasks: TasksType
    filter: FilterValuesType
    addTask: (value: string) => void
    removeTask: (taskId: string) => void
    changeTasksFilter: (value: FilterValuesType) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const Todolist = (props: PropsType) => {

    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<string>('');

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const addTask = () => {
        if (value.trim() !== '') {
            props.addTask(value.trim())
            setValue('')
        } else {
            setError('Title is required!')
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            addTask()
        }
        if (error !== '') {
            setError('')
        }
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={value}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyPressHandler} />
                <button onClick={addTask}>+</button>
                {
                    error
                        ? <span style={{ display: 'block' }}>{error}</span>
                        : null
                }
            </div>
            <ul style={{ listStyle: 'none' }}>
                {
                    props.tasks.map((task) => {
                        return (
                            <li key={task.id}>
                                <button onClick={() => props.removeTask(task.id)}>x</button>
                                <input type="checkbox"
                                    checked={task.isDone}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        props.changeTaskStatus(task.id, e.currentTarget.checked)
                                    }} />
                                <span>{task.title}</span>
                            </li>
                        )
                    }
                    )
                }
            </ul>
            <div>
                <button onClick={() => props.changeTasksFilter('All')}>All</button>
                <button onClick={() => props.changeTasksFilter('Active')}>Active</button>
                <button onClick={() => props.changeTasksFilter('Completed')}>Completed</button>
            </div>
        </div>
    )
}
