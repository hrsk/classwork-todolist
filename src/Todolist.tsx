import { memo, useCallback } from "react"
import { Tasks } from "./Tasks"
import { CustomInputForm } from "./components/CustomInputForm"
import { EditableSpan } from "./components/EditableSpan"
import { FilterValuesType, TaskStatuses } from "./types"

type PropsType = {
    todolistId: string
    title: string
    filter: 'All' | 'Active' | 'Completed'
    addTask: (todolistId: string, value: string) => void
    removeTask: (todolistId: string, taskId: string) => void
    changeTasksFilter: (todolistId: string, value: FilterValuesType) => void
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, value: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, value: string) => void
}

export const Todolist = memo((props: PropsType) => {

    const addTask = useCallback((value: string) => {
        props.addTask(props.todolistId, value)
    }, [props.addTask, props.todolistId])

    const changeTodolistTitleHandler = useCallback((value: string) => {
        props.changeTodolistTitle(props.todolistId, value)
    }, [props.changeTodolistTitle, props.todolistId])

    const changeTasksFilterHandler = useCallback((value: FilterValuesType) => {
        props.changeTasksFilter(props.todolistId, value)
    }, [props.changeTasksFilter, props.todolistId])

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
            <Tasks todolistId={props.todolistId}
                filter={props.filter}
                removeTask={props.removeTask}
                changeTaskStatus={props.changeTaskStatus}
                changeTaskTitle={props.changeTaskTitle} />
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
})
