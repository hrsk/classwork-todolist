import { ChangeEvent, memo, useCallback } from "react"
import { EditableSpan } from "./components/EditableSpan"
import { TaskResponseType, TaskStatuses } from "./types"

type PropsType = {
    todolistId: string
    task: TaskResponseType
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
    changeTaskTitle: (todolistId: string, taskId: string, value: string) => void
}

export const Task = memo((props: PropsType) => {

    const removeTaskHandler = useCallback((taskId: string) => {
        props.removeTask(props.todolistId, taskId)
    }, [props.removeTask, props.todolistId])

    const changeTaskStatusHandler = useCallback((taskId: string, checked: boolean) => {
        if (checked) {
            props.changeTaskStatus(props.todolistId, taskId, TaskStatuses.New)
        }
        if (!checked) {
            props.changeTaskStatus(props.todolistId, taskId, TaskStatuses.Completed)
        }
    }, [props.changeTaskStatus, props.todolistId])

    const changeTaskTitleHandler = useCallback((taskId: string, value: string) => {
        props.changeTaskTitle(props.todolistId, taskId, value)
    }, [props.changeTaskTitle, props.todolistId])

    return (
        <li className={props.task.status === TaskStatuses.New ? 'isDone' : ''}>
            <button onClick={() => removeTaskHandler(props.task.id)}>x</button>
            <input type="checkbox"
                checked={!props.task.status}
                onChange={(e: ChangeEvent<HTMLInputElement>) => changeTaskStatusHandler(props.task.id, e.currentTarget.checked)} />
            <EditableSpan value={props.task.title}
                callback={(value: string) => changeTaskTitleHandler(props.task.id, value)} />
        </li>
    )
})
