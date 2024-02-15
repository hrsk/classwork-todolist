import axios from 'axios'
import { TodolistResponseType, ResponseType } from '../types'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '794181ab-6d62-4cfb-bc9f-d539dfac55f1',
    },
})

export const todolistAPI = {
    get() {
        return instance.get<Array<TodolistResponseType>>(`todo-lists`)
    },
    create(value: string) {
        return instance.post<ResponseType<{ item: TodolistResponseType }>>(`todo-lists`, { title: value })
    },
    delete(todolistId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`)
    },
    update(todolistId: string, value: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`, { title: value })
    },
}
