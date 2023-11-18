import React, {ChangeEvent, KeyboardEvent, memo, useCallback, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

type PropsType = {
    // value: string
    // setValue: (value: string) => void
    callbackHandler: (value: string) => void
    name: string
}
export const InputWithButton = memo((props: PropsType) => {
    console.log('InputWithButton is called')

    const [error, setError] = useState('')
    const [value, setValue] = useState<string>('')


    const onChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value)
    },[])

    const onKeyPressHandler = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && event.metaKey) {
            if (value.trim() !== '') {
                props.callbackHandler(value);
                setValue('')
                if (error !== null) {
                    setError('')
                }
            } else {
                setError('Invalid input value!')
            }
        }
    }, [props.callbackHandler, setError])

    const onClickHandler = useCallback(() => {
        if (value.trim() !== '') {
            props.callbackHandler(value)
            setError('')
            setValue('')
        } else {
            setError('Invalid input value!')
        }
    }, [value, props.callbackHandler, setError])

    return (
        <div>
            <TextField error={!!error}
                       size={'small'}
                       value={value}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       autoFocus
                       label={error}/>
            <IconButton onClick={onClickHandler} color={'primary'} size={'small'}>
                <AddBox/>
            </IconButton>
            {/*<Input value={props.value}*/}
            {/*       error={error}*/}
            {/*       setError={setError}*/}
            {/*       callback={props.setValue}*/}
            {/*       keyPressCallback={props.callbackButtonHandler}*/}
            {/*/>*/}
            {/*<ButtonComponent name={props.name}*/}
            {/*                 value={props.value}*/}
            {/*                 setError={setError}*/}
            {/*                 callback={props.callbackButtonHandler}*/}
            {/*/>*/}
        </div>
    );
});
