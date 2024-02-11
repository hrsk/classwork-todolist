import { useSelector } from "react-redux"
import { Todolist } from "./Todolist"
import { AppRootStateType } from "./store/store"
import { FilterValuesType, TodolistType } from "./types"
import { memo } from "react"

type PropsType = {
    addTask: (todolistId: string, value: string) => void
    removeTask: (todolistId: string, taskId: string) => void
    changeTasksFilter: (todolistId: string, value: FilterValuesType) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, value: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, value: string) => void
}
export const Lists = memo((props: PropsType) => {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)

    return (
        <div>
            {
                todolists.map(todolist => {
                    return (
                        <Todolist
                            key={todolist.id}
                            todolistId={todolist.id}
                            title={todolist.title}
                            filter={todolist.filter}
                            addTask={props.addTask}
                            removeTask={props.removeTask}
                            changeTasksFilter={props.changeTasksFilter}
                            changeTaskStatus={props.changeTaskStatus}
                            removeTodolist={props.removeTodolist}
                            changeTodolistTitle={props.changeTodolistTitle}
                            changeTaskTitle={props.changeTaskTitle} />
                    )
                })}
        </div>
    )
})
