import { ChangeEvent, memo, useCallback } from "react"
import { TaskType } from "./types"
import { EditableSpan } from "./components/EditableSpan"

type PropsType = {
    todolistId: string
    task: TaskType
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, value: string) => void
}

export const Task = memo((props: PropsType) => {

    const removeTaskHandler = useCallback((taskId: string) => {
        props.removeTask(props.todolistId, taskId)
    }, [props.removeTask, props.todolistId])

    const changeTaskStatusHandler = useCallback((taskId: string, checked: boolean) => {
        props.changeTaskStatus(props.todolistId, taskId, checked)
    }, [props.changeTaskStatus, props.todolistId])

    const changeTaskTitleHandler = useCallback((taskId: string, value: string) => {
        props.changeTaskTitle(props.todolistId, taskId, value)
    }, [props.changeTaskTitle, props.todolistId])

    return (
        <li className={props.task.isDone ? 'isDone' : ''}>
            <button onClick={() => removeTaskHandler(props.task.id)}>x</button>
            <input type="checkbox"
                checked={props.task.isDone}
                onChange={(e: ChangeEvent<HTMLInputElement>) => changeTaskStatusHandler(props.task.id, e.currentTarget.checked)} />
            <EditableSpan value={props.task.title}
                callback={(value: string) => changeTaskTitleHandler(props.task.id, value)} />
        </li>
    )
})
