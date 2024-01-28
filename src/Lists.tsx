import { Grid, Paper } from "@mui/material";
import { memo } from "react";
import { useSelector } from "react-redux";
import { FilterValuesType, TodolistType } from ".";
import { Todolist } from "./Todolist";
import { AppStateType } from "./state/store";

type PropsType = {
    removeTask: (todolistId: string, taskId: string) => void;
    changeTaskStatus: (
        todolistId: string,
        taskId: string,
        isDone: boolean
    ) => void;
    changeFilter: (todolistId: string, filter: FilterValuesType) => void;
    addTask: (todolistId: string, value: string) => void;
    addTodolist: (value: string) => void;
    removeTodolist: (todolistId: string) => void;
    changeTaskTitle: (
        todolistId: string,
        taskId: string,
        value: string
    ) => void;
    changeTodolistTitle: (todolistId: string, value: string) => void;
};

export const ListsComponent = memo((props: PropsType) => {
    const lists = useSelector<AppStateType, TodolistType[]>(
        (state) => state.todolistReducer
    );

    return (
        <Grid container spacing={3}>
            {lists.map((todolist) => {
                return (
                    <Grid item key={todolist.id}>
                        <Paper style={{ padding: "10px" }}>
                            <Todolist
                                key={todolist.id}
                                todolistId={todolist.id}
                                title={todolist.title}
                                removeTask={props.removeTask}
                                changeTaskStatus={props.changeTaskStatus}
                                filter={todolist.filter}
                                changeFilter={props.changeFilter}
                                addTask={props.addTask}
                                addTodolist={props.addTodolist}
                                removeTodolist={props.removeTodolist}
                                changeTaskTitle={props.changeTaskTitle}
                                changeTodolistTitle={props.changeTodolistTitle}
                            />
                        </Paper>
                    </Grid>
                );
            })}
        </Grid>
    );
});
