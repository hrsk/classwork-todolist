import React, {ChangeEvent, useState, KeyboardEvent} from 'react';

type PropsType = {
    value: string
    callback: (value: string) => void
}
export const EditableSpan = (props: PropsType) => {

    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(props.value);

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value)
    }
    const editModeHandler = () => {
        setEdit(true)
    }

    const viewModeHandler = () => {
        props.callback(value)
        setEdit(false)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && event.metaKey) {
            viewModeHandler()
        }
    }

    return (
        edit
            ? <input value={value}
                     onChange={onChangeHandler}
                     onBlur={viewModeHandler}
                     onKeyDown={onKeyPressHandler}
            />
            : <span onDoubleClick={editModeHandler}>{props.value}</span>
    );
};
