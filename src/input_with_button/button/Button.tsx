type PropsType = {
    name: string
    value: string
    callback: () => void
    setError: (error: string) => void
}
export const Button = (props: PropsType) => {

    const onClickHandler = () => {
        if (props.value.trim() !== '') {
            props.callback()
            props.setError('')
        } else {
            props.setError('Invalid input value!')
        }
    }

    return (
        <button onClick={onClickHandler}>{props.name}</button>
    )
}