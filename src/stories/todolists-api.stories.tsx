import { useEffect, useState } from 'react'
import { todolistAPI } from '../api/API'

export default {
    title: 'API'
}

export const GetTodolists = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistAPI.get().then((res) => {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {

    const [state, setState] = useState<any>(null)


    useEffect(() => {
        todolistAPI.create('SOME NEW TITLE').then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {

    const [state, setState] = useState<any>(null)

    const todolistId = '2b816438-8990-4738-a1d6-3658e1267ef6'

    useEffect(() => {
        todolistAPI.delete(todolistId).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {

    const [state, setState] = useState<any>(null)

    const todolistId = 'e40029a1-70ce-4b17-92f3-2f4dddc9756a'

    useEffect(() => {
        todolistAPI.update(todolistId, 'UPDATE NEW TITLE2222').then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
