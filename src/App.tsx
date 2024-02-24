import { memo, useCallback, useEffect } from 'react';
import './App.css';
import { Lists } from './Lists';
import { CustomInputForm } from './components/CustomInputForm';
import { useAppDispatch } from './store/store';
import { addTaskThunk, changeTaskStatusAC, removeTaskAC, updateTaskThunk } from './store/tasks-reducer';
import { addTodolistThunk, changeTodolistFilterAC, changeTodolistTitleAC, fetchTodolistsThunkCreator, removeTodolistAC } from './store/todolists-reducer';
import { FilterValuesType, TaskStatuses } from './types';

export const App = memo(() => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsThunkCreator())
    }, [])

    const addTask = useCallback((todolistId: string, value: string) => {
        dispatch(addTaskThunk(todolistId, value))
        // dispatch(addTaskAC(todolistId, value))
    }, [dispatch])

    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId));
    }, [dispatch])

    const changeTasksFilter = useCallback((todolistId: string, value: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }, [dispatch])
    const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, status))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }, [dispatch])

    const addTodolist = useCallback((value: string) => {
        dispatch(addTodolistThunk(value))
        // dispatch(addTodolistAC(value))
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, value: string) => {
        const action = changeTodolistTitleAC(todolistId, value)
        dispatch(action)
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistId: string, taskId: string, value: string) => {
        dispatch(updateTaskThunk(todolistId, taskId, value))
        // dispatch(changeTaskTitleAC(todolistId, taskId, value))
    }, [dispatch])

    return (
        <div className="App">
            <CustomInputForm callbackFn={(value: string) => addTodolist(value)} />
            <Lists
                addTask={addTask}
                removeTask={removeTask}
                changeTasksFilter={changeTasksFilter}
                changeTaskStatus={changeTaskStatus}
                removeTodolist={removeTodolist}
                changeTodolistTitle={changeTodolistTitle}
                changeTaskTitle={changeTaskTitle} />
        </div>
    );
})
