import { useEffect, useState } from 'react'
import { tasksAPI } from '../api/API'
import { UpdateTaskModel } from '../types'

export default {
    title: 'TASKS API'
}

export const GetTasks = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {

        const todolistId = '7acee6ad-7557-4f09-afb6-9025332f74af'

        tasksAPI.get(todolistId)
            .then(res => { setState(res.data.items) })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {

        const todolistId = '7acee6ad-7557-4f09-afb6-9025332f74af'
        const value = '1111111'

        tasksAPI.create(todolistId, value)
            .then(res => {
                setState(res.data.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {


        const todolistId = '7acee6ad-7557-4f09-afb6-9025332f74af'
        const taskId = '594f7999-bc40-4674-bbb4-3681f3bf3976'

        tasksAPI.delete(todolistId, taskId).then((res) => {
            setState(res.data.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTaskTitle = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {

        const todolistId = '7acee6ad-7557-4f09-afb6-9025332f74af'
        const taskId = '4ade2112-3508-47ee-93be-0bc15a9dc8cf'
        const value: UpdateTaskModel = {
            title: 'zxczxczxc',
            description: null,
            status: 0,
            priority: 0,
            startDate: null,
            deadline: null,
        }

        tasksAPI.update(todolistId, taskId, value).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
