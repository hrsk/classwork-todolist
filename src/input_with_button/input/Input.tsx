import {ChangeEvent} from "react";

type PropsType = {
    value: string
    callback: (value: string) => void
}
export const Input = (props: PropsType) => {

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.callback(event.currentTarget.value)
    }

    return (
        <>
            <input value={props.value} onChange={onChangeHandler}/>
        </>
    )
}