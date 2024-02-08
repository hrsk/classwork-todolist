import { TodolistType } from "./types"

export const todolistsReducer = (state: Array<TodolistType>, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE_TODOLIST': return state.filter(todolist => todolist.id !== action.todolistId)
        default: return state
    }
}

export type RemoveTodolistActionType = {
    type: 'REMOVE_TODOLIST'
    todolistId: string
}

type ActionsType = RemoveTodolistActionType;

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {
        type: 'REMOVE_TODOLIST',
        todolistId,
    }
}
