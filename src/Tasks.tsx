import { memo } from "react";
import { useSelector } from "react-redux";
import { Task } from "./Task";
import { FilterValuesType, TaskType } from "./index";
import { AppStateType } from "./state/store";

type PropsType = {
    removeTask: (todolistId: string, taskId: string) => void;
    changeTaskStatus: (
        todolistId: string,
        taskId: string,
        isDone: boolean
    ) => void;
    changeTaskTitle: (
        todolistId: string,
        taskId: string,
        value: string
    ) => void;
    // task: TaskType;
    filter: FilterValuesType;
    todolistId: string;
};
export const Tasks = memo((props: PropsType) => {
    const tasks = useSelector<AppStateType, Array<TaskType>>(
        (state) => state.tasksReducer[props.todolistId]
    );

    // const removeTask = useCallback(
    //     (taskId: string) => {
    //         props.removeTask(props.todolistId, taskId);
    //     },
    //     [props.removeTask, props.todolistId]
    // );

    // const changeTaskStatus = useCallback(
    //     (taskId: string, isDone: boolean) => {
    //         props.changeTaskStatus(props.todolistId, taskId, isDone);
    //     },
    //     [props.changeTaskStatus, props.todolistId]
    // );

    // const changeTaskTitleCallbackHandler = useCallback(
    //     (taskId: string, value: string) => {
    //         props.changeTaskTitle(props.todolistId, taskId, value);
    //     },
    //     [props.changeTaskTitle, props.todolistId]
    // );

    let filteredTasks = tasks;

    if (props.filter === "Completed") {
        filteredTasks = tasks.filter((task) => task.isDone);
    }
    if (props.filter === "Active") {
        filteredTasks = tasks.filter((task) => !task.isDone);
    }

    return (
        <ul style={{ listStyle: "none" }}>
            {filteredTasks.map((task: TaskType) => (
                <Task
                    key={task.id}
                    task={task}
                    removeTask={props.removeTask}
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}
                    todolistId={props.todolistId}
                />
                // <li key={task.id}>
                //     <IconButton onClick={() => removeTask(task.id)}>
                //         <Delete />
                //     </IconButton>
                //     <Checkbox
                //         checked={task.isDone}
                //         onChange={(e) =>
                //             changeTaskStatus(
                //                 task.id,
                //                 e.currentTarget.checked
                //             )
                //         }
                //     />
                //     <EditableSpan
                //         value={task.title}
                //         callback={(value) =>
                //             changeTaskTitleCallbackHandler(task.id, value)
                //         }
                //     />
                // </li>
            ))}
        </ul>
        // <li key={props.task.id}>
        //     <IconButton onClick={() => removeTask(props.task.id)}>
        //         <Delete />
        //     </IconButton>
        //     <Checkbox
        //         checked={props.task.isDone}
        //         onChange={(e) =>
        //             changeTaskStatus(props.task.id, e.currentTarget.checked)
        //         }
        //     />
        //     <EditableSpan
        //         value={props.task.title}
        //         callback={(value) => changeTaskTitleCallbackHandler(props.task.id, value)}
        //     />
        // </li>
    );
});
