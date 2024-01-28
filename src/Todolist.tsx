import { Delete } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { memo, useCallback } from "react";
import { Tasks } from "./Tasks";
import { EditableSpan } from "./editable_span/EditableSpan";
import { FilterValuesType } from "./index";
import { InputWithButton } from "./input_with_button/InputWithButton";

type PropsType = {
    todolistId: string;
    title: string;
    removeTask: (todolistId: string, taskId: string) => void;
    changeTaskStatus: (
        todolistId: string,
        taskId: string,
        isDone: boolean
    ) => void;
    filter: FilterValuesType;
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
export const Todolist = memo((props: PropsType) => {
    console.log("Todolist is called");

    // const tasks = useSelector<AppStateType, Array<TaskType>>(
    //     (state) => state.tasksReducer[props.todolistId]
    // );

    const changeTaskFilter = useCallback(
        (filter: FilterValuesType) => {
            props.changeFilter(props.todolistId, filter);
        },
        [props.changeFilter, props.todolistId]
    );

    const addTask = useCallback(
        (value: string) => {
            props.addTask(props.todolistId, value);
        },
        [props.addTask, props.todolistId]
    );

    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.todolistId);
    }, [props.removeTodolist, props.todolistId]);

    const changeTodolistTitleCallbackHandler = useCallback(
        (value: string) => {
            props.changeTodolistTitle(props.todolistId, value);
        },
        [props.changeTodolistTitle]
    );

    // let filteredTasks = tasks;

    // if (props.filter === "Completed") {
    //     filteredTasks = tasks.filter((task) => task.isDone);
    // }
    // if (props.filter === "Active") {
    //     filteredTasks = tasks.filter((task) => !task.isDone);
    // }

    return (
        <div>
            <h3>
                <EditableSpan
                    value={props.title}
                    callback={(value) =>
                        changeTodolistTitleCallbackHandler(value)
                    }
                />
                <IconButton onClick={removeTodolist}>
                    <Delete />
                </IconButton>
            </h3>
            <InputWithButton callbackHandler={addTask} name={"+"} />
            <Tasks
                filter={props.filter}
                todolistId={props.todolistId}
                removeTask={props.removeTask}
                changeTaskStatus={props.changeTaskStatus}
                changeTaskTitle={props.changeTaskTitle}
            />
            {/* <ul style={{ listStyle: "none" }}>
                {tasks.map((task) => (
                    <Task
                        // task={task}
                        key={task.id}
                        todolistId={props.todolistId}
                        removeTask={props.removeTask}
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={props.changeTaskTitle}
                    />
                ))}
            </ul> */}
            <div>
                <Button
                    variant={props.filter === "All" ? "contained" : "outlined"}
                    onClick={() => changeTaskFilter("All")}
                >
                    All
                </Button>
                <Button
                    variant={
                        props.filter === "Active" ? "contained" : "outlined"
                    }
                    onClick={() => changeTaskFilter("Active")}
                >
                    Active
                </Button>
                <Button
                    variant={
                        props.filter === "Completed" ? "contained" : "outlined"
                    }
                    onClick={() => changeTaskFilter("Completed")}
                >
                    Completed
                </Button>
            </div>
        </div>
    );
});
