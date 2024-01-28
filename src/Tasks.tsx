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
    filter: FilterValuesType;
    todolistId: string;
};
export const Tasks = memo((props: PropsType) => {
    const tasks = useSelector<AppStateType, Array<TaskType>>(
        (state) => state.tasksReducer[props.todolistId]
    );

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
            ))}
        </ul>
    );
});
