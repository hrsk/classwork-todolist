import {AddBox} from "@mui/icons-material"
import {IconButton} from "@mui/material"
import {memo, useCallback} from "react";

type PropsType = {
    name: string
    value: string
    callback: () => void
    setError: (error: string) => void
}
export const ButtonComponent = memo((props: PropsType) => {

    const onClickHandler = useCallback(() => {
        if (props.value.trim() !== '') {
            props.callback()
            props.setError('')
        } else {
            props.setError('Invalid input value!')
        }
    }, [props.value, props.callback, props.setError])

    return (
        <IconButton onClick={onClickHandler} color={'primary'} size={'small'}>
            <AddBox/>
        </IconButton>
    )
})
