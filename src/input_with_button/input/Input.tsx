import {ChangeEvent, KeyboardEvent} from "react";

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
        <>
            <input style={props.error ? {borderColor: 'crimson'} : {color: 'black'}}
                   value={props.value}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}
            />
            {
                props.error
                    ? <div style={{color: 'crimson'}}>{props.error}</div>
                    : null
            }
        </>
    )
}