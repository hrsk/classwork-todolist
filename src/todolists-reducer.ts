import { TodolistType } from "./types"

export const todolistsReducer = (state: Array<TodolistType>, action: any) => {
    switch (action.type) {
        case 'REMOVE_TODOLIST': return state.filter(todolist => todolist.id !== action.todolistId)
        default: return state
    }
}
