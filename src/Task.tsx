import { Checkbox, IconButton } from "@mui/material";
import { TaskType } from ".";
import { Delete } from "@mui/icons-material";
import { EditableSpan } from "./editable_span/EditableSpan";
import { memo } from "react";

type PropsType = {
    task: TaskType;
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
    todolistId: string;
};

export const Task = memo((props: PropsType) => {
    return (
        <li key={props.task.id}>
            <IconButton
                onClick={() =>
                    props.removeTask(props.todolistId, props.task.id)
                }
            >
                <Delete />
            </IconButton>
            <Checkbox
                checked={props.task.isDone}
                onChange={(e) =>
                    props.changeTaskStatus(
                        props.todolistId,
                        props.task.id,
                        e.currentTarget.checked
                    )
                }
            />
            <EditableSpan
                value={props.task.title}
                callback={(value) =>
                    props.changeTaskTitle(
                        props.todolistId,
                        props.task.id,
                        value
                    )
                }
            />
        </li>
    );
});
