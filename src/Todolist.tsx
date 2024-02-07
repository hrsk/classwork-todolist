import { ChangeEvent } from "react"
import { FilterValuesType, TaskType } from "./types"
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

    const addTask = (value: string) => {
        props.addTask(props.todolistId, value)
    }

    const removeTaskHandler = (taskId: string) => {
        props.removeTask(props.todolistId, taskId)
    }

    const changeTaskStatusHandler = (taskId: string, checked: boolean) => {
        props.changeTaskStatus(props.todolistId, taskId, checked)
    }

    const changeTodolistTitleHandler = (value: string) => {
        props.changeTodolistTitle(props.todolistId, value)
    }
    const changeTaskTitleHandler = (taskId: string, value: string) => {
        props.changeTaskTitle(props.todolistId, taskId, value)
    }

    const changeTasksFilterHandler = (value: FilterValuesType) => {
        props.changeTasksFilter(props.todolistId, value)
    }

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h3>
                    <EditableSpan value={props.title}
                        callback={(value: string) => changeTodolistTitleHandler(value)} />
                </h3>
                <button style={{ width: '24px', height: '24px' }} onClick={() => props.removeTodolist(props.todolistId)}>x</button>
            </div>
            <CustomInputForm callbackFn={(value: string) => addTask(value)} />
            <ul style={{ listStyle: 'none' }}>
                {
                    props.tasks.map((task) => {
                        return (
                            <li key={task.id} className={task.isDone ? 'isDone' : ''}>
                                <button onClick={() => removeTaskHandler(task.id)}>x</button>
                                <input type="checkbox"
                                    checked={task.isDone}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => changeTaskStatusHandler(task.id, e.currentTarget.checked)} />
                                <EditableSpan value={task.title}
                                    callback={(value: string) => changeTaskTitleHandler(task.id, value)} />
                            </li>
                        )
                    }
                    )
                }
            </ul>
            <div>
                <button className={props.filter === 'All' ? 'activeFilter' : 'default'}
                    onClick={() => changeTasksFilterHandler('All')}>All</button>
                <button className={props.filter === 'Active' ? 'activeFilter' : 'default'}
                    onClick={() => changeTasksFilterHandler('Active')}>Active</button>
                <button className={props.filter === 'Completed' ? 'activeFilter' : 'default'}
                    onClick={() => changeTasksFilterHandler('Completed')}>Completed</button>
            </div>
        </div>
    )
}
