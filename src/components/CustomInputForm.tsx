import { ChangeEvent, KeyboardEvent, memo, useState } from "react";

type PropsType = {
    callbackFn: (value: string) => void
}
export const CustomInputForm = memo((props: PropsType) => {

    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<string>('');

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const addTask = () => {
        if (value.trim() !== '') {
            props.callbackFn(value.trim())
            setValue('')
        } else {
            setError('Title is required!')
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            addTask()
        }
        if (error !== '') {
            setError('')
        }
    }

    return (
        <div>
            <input className={error ? 'errorBorder' : 'default'}
                value={value}
                onChange={onChangeHandler}
                onKeyDown={onKeyPressHandler} />
            <button className={error ? 'errorBorder' : 'default'}
                onClick={addTask}>+</button>
            {
                error
                    ? <span className={error ? 'errorMessage' : 'default'}
                        style={{ display: 'block' }}>{error}</span>
                    : null
            }
        </div>
    )
})
