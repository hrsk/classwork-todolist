import { ChangeEvent } from "react"
import { FilterValuesType, TaskType } from "./App"
import { CustomInputForm } from "./CustomInputForm"
import { EditableSpan } from "./EditableSpan"

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
    changeTodolistTitle: (todolistId: string, value: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, value: string) => void
}

export const Todolist = (props: PropsType) => {

    // const [value, setValue] = useState<string>('');
    // const [error, setError] = useState<string>('');

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setValue(e.currentTarget.value)
    // }

    const addTask = (value: string) => {
        props.addTask(props.todolistId, value)
        // if (value.trim() !== '') {
        //     props.addTask(props.todolistId, value.trim())
        //     setValue('')
        // } else {
        //     setError('Title is required!')
        // }
    }

    // const onKeyPressHandler = (e: KeyboardEvent) => {
    //     if (e.key === 'Enter') {
    //         addTask()
    //     }
    //     if (error !== '') {
    //         setError('')
    //     }
    // }

    const changeTodolistTitleHandler = (value: string) => {
        props.changeTodolistTitle(props.todolistId, value)
    }
    const changeTaskTitleHandler = (taskId: string, value: string) => {
        props.changeTaskTitle(props.todolistId, taskId, value)
    }

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h3>
                    <EditableSpan value={props.title}
                        callback={(value: string) => changeTodolistTitleHandler(value)} />
                </h3>
                {/* <h3>{props.title}</h3> */}
                <button style={{ width: '24px', height: '24px' }} onClick={() => props.removeTodolist(props.todolistId)}>x</button>
            </div>
            <CustomInputForm callbackFn={(value: string) => addTask(value)} />
            {/* <div>
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
            </div> */}
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
                                <EditableSpan value={task.title}
                                    callback={(value: string) => changeTaskTitleHandler(task.id, value)} />
                                {/* <span>{task.title}</span> */}
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
