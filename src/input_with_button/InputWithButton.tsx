import React, {useState} from 'react';
import {Input} from "./input/Input";
import {Button} from "./button/Button";

type PropsType = {
    value: string
    setValue: (value: string) => void
    callbackButtonHandler: () => void
    name: string
}
export const InputWithButton = (props: PropsType) => {

    const [error, setError] = useState('')

    return (
        <div>
            <Input value={props.value}
                   error={error}
                   setError={setError}
                   callback={props.setValue}
                   keyPressCallback={props.callbackButtonHandler}
            />
            <Button name={props.name}
                    value={props.value}
                    setError={setError}
                    callback={props.callbackButtonHandler}
            />
        </div>
    );
};
