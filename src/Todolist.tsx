import React, {memo, useCallback, useState} from "react";
import {FilterValuesType, TasksType} from "./index";
import {InputWithButton} from "./input_with_button/InputWithButton";
import {EditableSpan} from "./editable_span/EditableSpan";
import {useSelector} from "react-redux";
import {AppStateType} from "./state/store";
import {Button, Checkbox} from "@mui/material";
import {Delete} from '@mui/icons-material'
import {IconButton} from '@mui/material'

type PropsType = {
    todolistId: string
    title: string
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    changeFilter: (todolistId: string, filter: FilterValuesType) => void
    addTask: (todolistId: string, value: string) => void
    addTodolist: (value: string) => void
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, value: string) => void
    changeTodolistTitle: (todolistId: string, value: string) => void
}
export const Todolist = memo((props: PropsType) => {
    console.log('Todolist is called')

    const tasks = useSelector<AppStateType, TasksType>(state => state.tasksReducer)
    const [value, setValue] = useState<string>('')

    const removeTask = (taskId: string) => {
        props.removeTask(props.todolistId, taskId)
    }
    const changeTaskStatus = useCallback((taskId: string, isDone: boolean) => {
        props.changeTaskStatus(props.todolistId, taskId, isDone)
    }, [props.changeTaskStatus, props.todolistId])

    const changeTaskFilter = useCallback((filter: FilterValuesType) => {
        props.changeFilter(props.todolistId, filter)
    }, [props.changeFilter, props.todolistId])

    const addTask = useCallback(() => {
        if (value.trim() !== null) {
            props.addTask(props.todolistId, value)
            setValue('')
        }
    }, [props.addTask, props.todolistId, value])

    const removeTodolist = () => {
        props.removeTodolist(props.todolistId)
    }

    const changeTaskTitleCallbackHandler = useCallback((taskId: string, value: string) => {
        props.changeTaskTitle(props.todolistId, taskId, value)
    }, [props.changeTaskTitle, props.todolistId, value])

    const changeTodolistTitleCallbackHandler = useCallback((value: string) => {
        props.changeTodolistTitle(props.todolistId, value)
    }, [props.changeTodolistTitle, props.todolistId, value])

    let filteredTasks = tasks[props.todolistId];

    if (props.filter === 'Completed') {
        filteredTasks = tasks[props.todolistId].filter(task => task.isDone)
    }
    if (props.filter === 'Active') {
        filteredTasks = tasks[props.todolistId].filter(task => !task.isDone)
    }

    return (
        <div>
            <h3>
                <EditableSpan value={props.title} callback={changeTodolistTitleCallbackHandler}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <InputWithButton value={value} setValue={setValue} callbackButtonHandler={addTask} name={'+'}/>
            <ul style={{listStyle: 'none'}}>
                {
                    filteredTasks.map(task => {
                            return (
                                <li key={task.id}>
                                    <IconButton onClick={() => removeTask(task.id)}>
                                        <Delete/>
                                    </IconButton>
                                    <Checkbox checked={task.isDone}
                                              onChange={(e) => changeTaskStatus(task.id, e.currentTarget.checked)}/>
                                    <EditableSpan value={task.title}
                                                  callback={(value) => changeTaskTitleCallbackHandler(task.id, value)}/>
                                </li>
                            )
                        }
                    )
                }
            </ul>
            <div>
                <Button variant={props.filter === 'All' ? 'contained' : 'outlined'}
                        onClick={() => changeTaskFilter('All')}>All</Button>
                <Button variant={props.filter === 'Active' ? 'contained' : 'outlined'}
                        onClick={() => changeTaskFilter('Active')}>Active</Button>
                <Button variant={props.filter === 'Completed' ? 'contained' : 'outlined'}
                        onClick={() => changeTaskFilter('Completed')}>Completed</Button>
            </div>
        </div>
    )
})
