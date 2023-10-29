import React, {ChangeEvent, useState, KeyboardEvent} from 'react';

type PropsType = {
    value: string
    callback: (value: string) => void
}
export const EditableSpan = (props: PropsType) => {

    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(props.value);
    const [error, setError] = useState('');

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value)
    }
    const editModeHandler = () => {
        setEdit(true)
    }

    const viewModeHandler = () => {
        if (value.trim() !== '') {
            props.callback(value)
            setEdit(false)
            setError('')
        } else {
            setError('Invalid input value!')
        }
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && event.metaKey) {
            if (value.trim() !== '') {
                viewModeHandler()
                setError('')
            } else {
                setError('Invalid input value!')
            }
        }
    }

    return (
        <> {
            edit
                ? <input style={error ? {borderColor: 'crimson'} : {borderColor: 'black'}}
                         value={value}
                         onChange={onChangeHandler}
                         onBlur={viewModeHandler}
                         onKeyDown={onKeyPressHandler}
                         autoFocus
                />
                : <span onDoubleClick={editModeHandler}>{props.value}</span>
        }
            {error
                ? <div style={{color: 'crimson'}}>
                    {error}
                </div>
                : ''
            }
        </>
    );
};
