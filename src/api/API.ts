import axios from 'axios'
import { TodolistResponseType, ResponseType, TaskResponseType, TasksResponseType, GetTasksResponseType, UpdateTaskModel } from '../types'

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

export const tasksAPI = {
    get(todolistId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    create(todolistId: string, value: string) {
        return instance.post<TasksResponseType<{ item: TaskResponseType }>>(`todo-lists/${todolistId}/tasks`, { title: value })
    },
    delete(todolistId: string, taskId: string) {
        return instance.delete<TasksResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    update(todolistId: string, taskId: string, value: UpdateTaskModel) {
        return instance.put<any>(`todo-lists/${todolistId}/tasks/${taskId}`, value)

    },
}
