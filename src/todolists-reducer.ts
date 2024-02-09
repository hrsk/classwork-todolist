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

export type RemoveTodolistActionType = {
    type: 'REMOVE_TODOLIST'
    todolistId: string
}
export type AddTodolistActionType = {
    type: 'ADD_TODOLIST'
    todolistId: string
    value: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE_TODOLIST_TITLE'
    todolistId: string
    value: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE_TODOLIST_FILTER'
    todolistId: string
    value: string
}

type ActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType;

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {
        type: 'REMOVE_TODOLIST',
        todolistId,
    }
}

export const addTodolistAC = (value: string): AddTodolistActionType => {
    return {
        type: 'ADD_TODOLIST',
        todolistId: v1(),
        value,
    }
}

export const changeTodolistAC = (todolistId: string, value: string): ChangeTodolistTitleActionType => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        todolistId,
        value,
    }
}

export const changeTodolistFilterAC = (todolistId: string, value: string): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE_TODOLIST_FILTER',
        todolistId,
        value,
    }
}
