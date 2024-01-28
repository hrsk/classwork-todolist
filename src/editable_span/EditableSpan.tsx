import { TextField } from "@mui/material";
import { ChangeEvent, KeyboardEvent, memo, useState } from "react";

type PropsType = {
    value: string;
    callback: (value: string) => void;
};
export const EditableSpan = memo((props: PropsType) => {
    console.log("Editable Span is called");

    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(props.value);
    const [error, setError] = useState("");

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    };
    const editModeHandler = () => {
        setEdit(true);
    };

    const callbackHandler = () => {
        if (value.trim() !== "") {
            props.callback(value);
            setEdit(false);
        } else {
            setError("Invalid input value!");
        }
    };

    const viewModeHandler = () => {
        callbackHandler();
    };

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && event.metaKey) {
            if (value.trim() !== "") {
                viewModeHandler();
            }
        }
        if (error !== "") {
            setError("");
        }
    };

    return (
        <>
            {edit ? (
                <TextField
                    error={!!error}
                    size={"small"}
                    value={value}
                    onChange={onChangeHandler}
                    onBlur={viewModeHandler}
                    onKeyDown={onKeyPressHandler}
                    autoFocus
                    label={error}
                />
            ) : (
                <span onDoubleClick={editModeHandler}>{props.value}</span>
            )}
        </>
    );
});
