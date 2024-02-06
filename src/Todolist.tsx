import { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValuesType, TaskType } from "./App"

type PropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    filter: 'All' | 'Active' | 'Completed'
    addTask: (todolistId: string, value: string) => void
    removeTask: (todolistId: string, taskId: string) => void
    changeTasksFilter: (todolistId: string, value: FilterValuesType) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    removeTodolist: (todolistId: string) => void
}

export const Todolist = (props: PropsType) => {

    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<string>('');

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const addTask = () => {
        if (value.trim() !== '') {
            props.addTask(props.todolistId, value.trim())
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
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h3>{props.title}</h3>
                <button style={{ width: '24px', height: '24px' }} onClick={() => props.removeTodolist(props.todolistId)}>x</button>
            </div>
            <div>
                <input className={error ? 'error' : 'default'}
                    value={value}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyPressHandler} />
                <button className={error ? 'error' : 'default'}
                    onClick={addTask}>+</button>
                {
                    error
                        ? <span className={error ? 'error-message' : 'default'}
                            style={{ display: 'block' }}>{error}</span>
                        : null
                }
            </div>
            <ul style={{ listStyle: 'none' }}>
                {
                    props.tasks.map((task) => {
                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <button onClick={() => props.removeTask(props.todolistId, task.id)}>x</button>
                                <input type="checkbox"
                                    checked={task.isDone}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        props.changeTaskStatus(props.todolistId, task.id, e.currentTarget.checked)
                                    }} />
                                <span>{task.title}</span>
                            </li>
                        )
                    }
                    )
                }
            </ul>
            <div>
                <button className={props.filter === 'All' ? 'active-filter' : 'default'}
                    onClick={() => props.changeTasksFilter(props.todolistId, 'All')}>All
                </button>
                <button className={props.filter === 'Active' ? 'active-filter' : 'default'}
                    onClick={() => props.changeTasksFilter(props.todolistId, 'Active')}>Active</button>
                <button className={props.filter === 'Completed' ? 'active-filter' : 'default'}
                    onClick={() => props.changeTasksFilter(props.todolistId, 'Completed')}>Completed</button>
            </div>
        </div>
    )
}
