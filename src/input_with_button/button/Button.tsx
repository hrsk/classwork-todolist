import {AddBox} from "@mui/icons-material"
import {IconButton} from "@mui/material"

type PropsType = {
    name: string
    value: string
    callback: () => void
    setError: (error: string) => void
}
export const ButtonComponent = (props: PropsType) => {

    const onClickHandler = () => {
        if (props.value.trim() !== '') {
            props.callback()
            props.setError('')
        } else {
            props.setError('Invalid input value!')
        }
    }

    return (
        <IconButton onClick={onClickHandler} color={'primary'} size={'small'}>
            <AddBox/>
        </IconButton>
        // <Button style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}
        //         variant={'outlined'}
        //         onClick={onClickHandler}>{props.name}</Button>
        // <button onClick={onClickHandler}>{props.name}</button>
    )
}