import React, {memo, useState} from 'react';
import {Input} from "./input/Input";
import {ButtonComponent} from "./button/Button";

type PropsType = {
    value: string
    setValue: (value: string) => void
    callbackButtonHandler: () => void
    name: string
}
export const InputWithButton = memo((props: PropsType) => {
    console.log('InputWithButton is called')

    const [error, setError] = useState('')

    return (
        <div>
            <Input value={props.value}
                   error={error}
                   setError={setError}
                   callback={props.setValue}
                   keyPressCallback={props.callbackButtonHandler}
            />
            <ButtonComponent name={props.name}
                             value={props.value}
                             setError={setError}
                             callback={props.callbackButtonHandler}
            />
        </div>
    );
});
