import { v1 } from "uuid"
import { TodolistType } from "./types"

export const todolistsReducer = (state: Array<TodolistType>, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE_TODOLIST': return state.filter(todolist => todolist.id !== action.todolistId)
        case 'ADD_TODOLIST': return [{ id: action.todolistId, title: action.value, filter: 'All' }, ...state]
        case 'CHANGE_TODOLIST_TITLE': return state.map(todolist => todolist.id === action.todolistId ? { ...todolist, title: action.value } : todolist)
        case 'CHANGE_TODOLIST_FILTER': return state.map(todolist => todolist.id === action.todolistId ? { ...todolist, filter: action.value } : todolist)
        default: return state
    }
}

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

type ActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType;

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE_TODOLIST',
        todolistId,
    } as const
}

export const addTodolistAC = (value: string) => {
    return {
        type: 'ADD_TODOLIST',
        todolistId: v1(),
        value,
    } as const
}

export const changeTodolistTitleAC = (todolistId: string, value: string) => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        todolistId,
        value,
    } as const
}

export const changeTodolistFilterAC = (todolistId: string, value: string) => {
    return {
        type: 'CHANGE_TODOLIST_FILTER',
        todolistId,
        value,
    } as const
}
