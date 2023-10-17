import React from 'react';
import {Input} from "./input/Input";
import {Button} from "./button/Button";

type PropsType = {
    value: string
    setValue: (value: string) => void
    callbackButtonHandler: () => void
    name: string
}
export const InputWithButton = (props: PropsType) => {
    return (
        <>
            <Input value={props.value} callback={props.setValue} />
            <Button name={props.name} callback={props.callbackButtonHandler} />
        </>
    );
};
