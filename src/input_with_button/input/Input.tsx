import {ChangeEvent, KeyboardEvent} from "react";

type PropsType = {
    value: string
    callback: (value: string) => void
    keyPressCallback: () => void
}
export const Input = (props: PropsType) => {

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.callback(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && event.metaKey) {
            props.keyPressCallback();
        }
    }

    return (
        <>
            <input value={props.value}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}
            />
        </>
    )
}