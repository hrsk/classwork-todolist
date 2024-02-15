import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '794181ab-6d62-4cfb-bc9f-d539dfac55f1',
    },
})

export const todolistAPI = {
    get() {
        return instance.get(`todo-lists`)
    },
    create(value: string) {
        return instance.post(`todo-lists`, { title: value })
    },
    delete(todolistId: string) {
        return instance.delete(`todo-lists/${todolistId}`)
    },
    update(todolistId: string, value: string) {
        return instance.put(`todo-lists/${todolistId}`, { title: value })
    },
}
