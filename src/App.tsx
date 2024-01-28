import { Container, Grid } from "@mui/material";
import { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import { ListsComponent } from "./Lists";
import DrawerAppBar from "./ResponsiveAppbar";
import { FilterValuesType } from "./index";
import { InputWithButton } from "./input_with_button/InputWithButton";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
} from "./state/reducers/tasks-reducer";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from "./state/reducers/todolist-reducer";

export const App = memo(() => {
    const dispatch = useDispatch();

    const removeTask = useCallback(
        (todolistId: string, taskId: string) => {
            dispatch(removeTaskAC(todolistId, taskId));
        },
        [dispatch]
    );

    const changeTaskStatus = useCallback(
        (todolistId: string, taskId: string, isDone: boolean) => {
            dispatch(changeTaskStatusAC(todolistId, taskId, isDone));
        },
        [dispatch]
    );

    const changeTaskFilter = useCallback(
        (todolistId: string, filter: FilterValuesType) => {
            dispatch(changeTodolistFilterAC(todolistId, filter));
        },
        [dispatch]
    );

    const addTask = useCallback(
        (todolistId: string, value: string) => {
            dispatch(addTaskAC(todolistId, value));
        },
        [dispatch]
    );

    const addTodolist = useCallback(
        (value: string) => {
            dispatch(addTodolistAC(value));
        },
        [dispatch]
    );

    const removeTodolist = useCallback(
        (todolistId: string) => {
            dispatch(removeTodolistAC(todolistId));
        },
        [dispatch]
    );

    const changeTaskTitle = useCallback(
        (todolistId: string, taskId: string, title: string) => {
            dispatch(changeTaskTitleAC(todolistId, taskId, title));
        },
        [dispatch]
    );

    const changeTodolistTitle = useCallback(
        (todolistId: string, title: string) => {
            dispatch(changeTodolistTitleAC(todolistId, title));
        },
        [dispatch]
    );

    return (
        <>
            <DrawerAppBar />
            <div className="App">
                <Container fixed>
                    <Grid container>
                        <InputWithButton
                            callbackHandler={addTodolist}
                            name={"+"}
                        />
                    </Grid>
                    <ListsComponent
                        removeTask={removeTask}
                        changeTaskStatus={changeTaskStatus}
                        changeFilter={changeTaskFilter}
                        addTask={addTask}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                        addTodolist={addTodolist}
                    />
                </Container>
            </div>
        </>
    );
});
