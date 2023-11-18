import {TextField} from "@mui/material";
import React, {ChangeEvent, KeyboardEvent, memo, useCallback} from "react";

type PropsType = {
    value: string
    error: string
    setError: (error: string) => void
    callback: (value: string) => void
    keyPressCallback: () => void
}
export const Input = memo((props: PropsType) => {

    const onChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        props.callback(event.currentTarget.value)
    },[props.callback])

    const onKeyPressHandler = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && event.metaKey) {
            if (props.value.trim() !== '') {
                props.keyPressCallback();
                if (props.error !== null) {
                    props.setError('')
                }
            } else {
                props.setError('Invalid input value!')
            }
        }
    }, [props.value, props.keyPressCallback, props.setError])

    return (
        <TextField error={!!props.error}
                   size={'small'}
                   value={props.value}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}
                   autoFocus
                   label={props.error}/>
    )
})