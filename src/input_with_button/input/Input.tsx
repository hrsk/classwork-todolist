import {TextField} from "@mui/material";
import React, {ChangeEvent, KeyboardEvent} from "react";

type PropsType = {
    value: string
    error: string
    setError: (error: string) => void
    callback: (value: string) => void
    keyPressCallback: () => void
}
export const Input = (props: PropsType) => {
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.callback(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && event.metaKey) {
            if (props.value.trim() !== '') {
                props.keyPressCallback();
                props.setError('')
            } else {
                props.setError('Invalid input value!')
            }
        }
    }

    return (
        <TextField error={!!props.error}
                   size={'small'}
                   value={props.value}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}
                   autoFocus
                   label={props.error}/>
    )
}