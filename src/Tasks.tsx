import { memo } from "react"
import { useSelector } from "react-redux"
import { Task } from "./Task"
import { AppRootStateType } from "./store/store"
import { FilterValuesType, TaskResponseType, TaskStatuses } from "./types"

type PropsType = {
    todolistId: string
    filter: FilterValuesType
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
    changeTaskTitle: (todolistId: string, taskId: string, value: string) => void
}

export const Tasks = memo((props: PropsType) => {

    const tasks = useSelector<AppRootStateType, Array<TaskResponseType>>(state => state.tasks[props.todolistId])

    let filteredTasks = tasks;
    if (props.filter === 'Active') {
        filteredTasks = tasks.filter(task => task.status === TaskStatuses.Completed)
    }
    if (props.filter === 'Completed') {
        filteredTasks = tasks.filter(task => task.status === TaskStatuses.New)
    }

    return (
        <ul style={{ listStyle: 'none' }}>
            {
                filteredTasks.map(task => {
                    return (
                        <Task key={task.id}
                            todolistId={props.todolistId}
                            task={task}
                            removeTask={props.removeTask}
                            changeTaskStatus={props.changeTaskStatus}
                            changeTaskTitle={props.changeTaskTitle} />
                    )
                })
            }
        </ul>
    )
})
