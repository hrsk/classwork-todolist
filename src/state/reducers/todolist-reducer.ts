import {FilterValuesType, TodolistType} from "../../index";
import {v1} from "uuid";

export const todolistReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(td => td.id !== action.todolistId)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(td => td.id === action.todolistId ? {...td, title: action.title} : td)
        case 'ADD-TODOLIST':
            return [
                ...state, {id: action.todolistId, title: action.title, filter: 'All'}
            ]
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(td => td.id === action.todolistId ? {...td, filter: action.filter} : td)
        default:
            throw new Error('I don\'t understand this type')
    }
}

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

type ActionsType = RemoveTodolistActionType
    | ChangeTodolistTitleActionType
    | AddTodolistActionType
    | ChangeTodolistFilterActionType
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        todolistId,
    } as const
}
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        todolistId,
        title,
    } as const
}
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        title,
        todolistId: v1(),
    } as const
}

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        todolistId,
        filter,
    } as const
}
