import { ChangeEvent, KeyboardEvent, memo, useState } from "react";

type PropsType = {
    value: string
    callback: (value: string) => void
}

export const EditableSpan = memo((props: PropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [value, setValue] = useState<string>(props.value);
    const [error, setError] = useState<string>('');

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const editModeHandler = () => {
        setEditMode(!editMode)
    }

    const viewModeHandler = () => {
        if (value.trim() !== '') {
            setEditMode(!editMode)
            props.callback(value.trim())
        } else {
            setError('Title is required!')
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            viewModeHandler()
        }
        if (error !== '') {
            setError('')
        }
    }

    return (
        <>
            {
                editMode
                    ? <input
                        className={error ? 'errorBorder' : 'default'}
                        value={value}
                        onChange={onChangeHandler}
                        onKeyDown={onKeyPressHandler}
                        onBlur={viewModeHandler}
                        autoFocus />
                    : <span onDoubleClick={editModeHandler}>{value}</span>
            }
            <span className={error ? 'errorMessage' : 'default'}
                style={{ display: 'block' }}>{error && error}</span>
        </>
    )
})
