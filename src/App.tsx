import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { Todolist } from './Todolist';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './store/tasks-reducer';
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from './store/todolists-reducer';
import { FilterValuesType, TasksType, TodolistType } from './types';
import { AppRootStateType } from './store/store';

export const App = () => {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
    const dispatch = useDispatch()

    const [value, setValue] = useState<string>('');

    const addTask = (todolistId: string, value: string) => {
        dispatch(addTaskAC(todolistId, value))
    }

    const removeTask = (todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId));
    }

    const changeTasksFilter = (todolistId: string, value: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, isDone))
    }

    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }

    const addTodolist = (value: string) => {
        dispatch(addTodolistAC(value))
        setValue('')
    }

    const changeTodolistTitle = (todolistId: string, value: string) => {
        const action = changeTodolistTitleAC(todolistId, value)
        dispatch(action)
    }

    const changeTaskTitle = (todolistId: string, taskId: string, value: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, value))
    }

    return (
        <div className="App">
            <div>
                <input value={value} onChange={(e: ChangeEvent<HTMLInputElement>) => { setValue(e.currentTarget.value) }} />
                <button onClick={() => addTodolist(value)}>+</button>
            </div>
            {
                todolists.map(todolist => {

                    let filteredTasks = tasks[todolist.id];
                    if (todolist.filter === 'Active') {
                        filteredTasks = tasks[todolist.id].filter(task => !task.isDone)
                    }
                    if (todolist.filter === 'Completed') {
                        filteredTasks = tasks[todolist.id].filter(task => task.isDone)
                    }

                    return (
                        <Todolist
                            key={todolist.id}
                            todolistId={todolist.id}
                            tasks={filteredTasks}
                            title={todolist.title}
                            filter={todolist.filter}
                            addTask={addTask}
                            removeTask={removeTask}
                            changeTasksFilter={changeTasksFilter}
                            changeTaskStatus={changeTaskStatus}
                            removeTodolist={removeTodolist}
                            changeTodolistTitle={changeTodolistTitle}
                            changeTaskTitle={changeTaskTitle} />
                    )
                })}
        </div>
    );
}
