import React, {memo, useCallback, useState} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {EditableSpan} from "./editable_span/EditableSpan";
import {TaskType} from "./index";

type PropsType = {
    task: TaskType
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, value: string) => void
    todolistId: string
    // value: string
}
export const Task = memo((props: PropsType) => {

    const [value, setValue] = useState<string>('')
    const removeTask = (taskId: string) => {
        props.removeTask(props.todolistId, taskId)
    }
    const changeTaskStatus = useCallback((taskId: string, isDone: boolean) => {
        props.changeTaskStatus(props.todolistId, taskId, isDone)
    }, [props.changeTaskStatus, props.todolistId])

    const changeTaskTitleCallbackHandler = useCallback((taskId: string, value: string) => {
        props.changeTaskTitle(props.todolistId, taskId, value)
    }, [props.changeTaskTitle, props.todolistId, value])

    return (
        <li key={props.task.id}>
            <IconButton onClick={() => removeTask(props.task.id)}>
                <Delete/>
            </IconButton>
            <Checkbox checked={props.task.isDone}
                      onChange={(e) => changeTaskStatus(props.task.id, e.currentTarget.checked)}/>
            <EditableSpan value={props.task.title}
                          callback={(value) => changeTaskTitleCallbackHandler(props.task.id, value)}/>
        </li>
    )
})

