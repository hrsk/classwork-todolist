import React, {useState} from "react";
import {FilterValuesType, TasksType, TaskType} from "./index";
import {InputWithButton} from "./input_with_button/InputWithButton";
import {EditableSpan} from "./editable_span/EditableSpan";
import {useSelector} from "react-redux";
import {AppStateType} from "./state/store";

type PropsType = {
    todolistId: string
    title: string
    // tasks: Array<TaskType>
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
export const Todolist = (props: PropsType) => {

    const tasks = useSelector<AppStateType, TasksType>(state => state.tasksReducer)

    const [value, setValue] = useState<string>('');

    const removeTask = (taskId: string) => {
        props.removeTask(props.todolistId, taskId)
    }
    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        props.changeTaskStatus(props.todolistId, taskId, isDone)
    }

    const changeTaskFilter = (filter: FilterValuesType) => {
        props.changeFilter(props.todolistId, filter)
    }

    const addTask = () => {
        if (value.trim() !== null) {
            props.addTask(props.todolistId, value)
            setValue('')
        }
    }

    const removeTodolist = () => {
        props.removeTodolist(props.todolistId)
    }

    const changeTaskTitleCallbackHandler = (taskId: string, value: string) => {
        props.changeTaskTitle(props.todolistId, taskId, value)
    }
    const changeTodolistTitleCallbackHandler = (value: string) => {
        props.changeTodolistTitle(props.todolistId, value)
    }

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
                {/*{props.title}*/}
                <button onClick={removeTodolist}>x</button>
            </h3>
            <InputWithButton value={value} setValue={setValue} callbackButtonHandler={addTask} name={'+'}/>
            <ul style={{listStyle: 'none'}}>
                {
                    filteredTasks.map(task => {
                            return (
                                <li key={task.id}>
                                    <button onClick={() => removeTask(task.id)}>x</button>
                                    <input type="checkbox"
                                           checked={task.isDone}
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
                <button className={props.filter === 'All' ? 'active' : ''}
                        onClick={() => changeTaskFilter('All')}>All
                </button>
                <button className={props.filter === 'Active' ? 'active' : ''}
                        onClick={() => changeTaskFilter('Active')}>Active
                </button>
                <button className={props.filter === 'Completed' ? 'active' : ''}
                        onClick={() => changeTaskFilter('Completed')}>Completed
                </button>
            </div>
        </div>
    )
}
