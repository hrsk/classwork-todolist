import React, {memo, useCallback} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {FilterValuesType, TodolistType} from "./index";
import {InputWithButton} from "./input_with_button/InputWithButton";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/reducers/tasks-reducer";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./state/reducers/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./state/store";
import {Container, Grid, Paper} from '@mui/material';
import DrawerAppBar from "./ResponsiveAppbar";

export const App = memo(() => {
    console.log('App is called')

    // const [value, setValue] = useState<string>('');

    const lists = useSelector<AppStateType, TodolistType[]>(state => state.todolistReducer)
    const dispatch = useDispatch();

    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))
    }, [])

    const changeTaskStatus = useCallback((todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, isDone))
    }, [])

    const changeTaskFilter = useCallback((todolistId: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistId, filter))
    }, [])

    const addTask = useCallback((todolistId: string, value: string) => {
        dispatch(addTaskAC(todolistId, value))
    }, [])

    const addTodolist = useCallback((value: string) => {
        dispatch(addTodolistAC(value))
    }, [])

    const addTodolistCallback = (value: string) => {
        addTodolist(value)
        // setValue('')
    }

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }, [])

    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, title))
    }, [])

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    }, [])

    return (
        <>
            <DrawerAppBar/>
            <div className="App">
                <Container fixed>
                    <Grid container>
                        <InputWithButton callbackHandler={(value: string) => addTodolistCallback(value)}
                                         name={'+'}
                        />
                    </Grid>
                    <Grid container spacing={3}>
                        {
                            lists.map(todolist => {
                                    return (
                                        <Grid item key={todolist.id}>
                                            <Paper style={{padding: '10px'}}>
                                                <Todolist key={todolist.id}
                                                          todolistId={todolist.id}
                                                          title={todolist.title}
                                                          removeTask={removeTask}
                                                          changeTaskStatus={changeTaskStatus}
                                                          filter={todolist.filter}
                                                          changeFilter={changeTaskFilter}
                                                          addTask={addTask}
                                                          addTodolist={addTodolist}
                                                          removeTodolist={removeTodolist}
                                                          changeTaskTitle={changeTaskTitle}
                                                          changeTodolistTitle={changeTodolistTitle}
                                                />
                                            </Paper>
                                        </Grid>
                                    )
                                }
                            )}
                    </Grid>
                </Container>
            </div>
        </>
    );
})
