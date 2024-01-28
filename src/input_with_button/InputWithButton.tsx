import { AddBox } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import { ChangeEvent, KeyboardEvent, memo, useState } from "react";

type PropsType = {
    callbackHandler: (value: string) => void;
    name: string;
};
export const InputWithButton = memo((props: PropsType) => {
    console.log("InputWithButton is called");

    const [error, setError] = useState("");
    const [value, setValue] = useState<string>("");

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    };

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && event.metaKey) {
            onClickHandler();
        }
        if (error !== "") {
            setError("");
        }
    };

    const addItem = () => {
        if (value.trim() !== "") {
            props.callbackHandler(value);
            setValue("");
        } else {
            setError("Invalid input value!");
        }
    };
    
    const onClickHandler = () => {
        addItem();
    };

    return (
        <div>
            <TextField
                error={!!error}
                size={"small"}
                value={value}
                onChange={onChangeHandler}
                onKeyDown={onKeyPressHandler}
                label={error}
            />
            <IconButton
                onClick={onClickHandler}
                color={"primary"}
                size={"small"}
            >
                <AddBox />
            </IconButton>
        </div>
    );
});
