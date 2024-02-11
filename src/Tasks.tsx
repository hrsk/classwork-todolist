import { useSelector } from "react-redux"
import { AppRootStateType } from "./store/store"
import { FilterValuesType, TaskType } from "./types"
import { memo } from "react"
import { Task } from "./Task"

type PropsType = {
    todolistId: string
    filter: FilterValuesType
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, value: string) => void
}

export const Tasks = memo((props: PropsType) => {

    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todolistId])

    let filteredTasks = tasks;
    if (props.filter === 'Active') {
        filteredTasks = tasks.filter(task => !task.isDone)
    }
    if (props.filter === 'Completed') {
        filteredTasks = tasks.filter(task => task.isDone)
    }

    return (
        <div>
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
        </div>
    )
})