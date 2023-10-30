import {FilterValuesType, TodolistType} from "../../index";
import {v1} from "uuid";


// type ActionType = {
//     type: string
//     [key: string]: any
// }


// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const todolistReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(td => td.id !== action.todolistId)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(td => td.id === action.todolistId ? {...td, title: action.title} : td)
        case 'ADD-TODOLIST':
            return [
                ...state, {id: v1(), title: action.title, filter: 'All'}
            ]
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(td => td.id === action.todolistId ? {...td, filter: action.filter} : td)
        default:
            throw new Error('I don\'t understand this type')
    }
}

// type RemoveTodolistActionType = {
//     type: 'REMOVE-TODOLIST'
//     todolistId: string
// }
// type ChangeTodolistTitleActionType = {
//     type: 'CHANGE-TODOLIST-TITLE'
//     todolistId: string
//     title: string
// }
// type AddTodolistActionType = {
//     type: 'ADD-TODOLIST'
//     title: string
// }
// type ChangeTodolistFilterActionType = {
//     type: 'CHANGE-TODOLIST-FILTER'
//     todolistId: string
//     filter: FilterValuesType
// }

type RemoveTodolistActionType = ReturnType<typeof RemoveTodolistAC>
type ChangeTodolistTitleActionType = ReturnType<typeof ChangeTodolistTitleAC>
type AddTodolistActionType = ReturnType<typeof AddTodolistAC>
type ChangeTodolistFilterActionType = ReturnType<typeof ChangeTodolistFilterAC>

type ActionsType = RemoveTodolistActionType
    | ChangeTodolistTitleActionType
    | AddTodolistActionType
    | ChangeTodolistFilterActionType
export const RemoveTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        todolistId,
    } as const
}
export const ChangeTodolistTitleAC = (todolistId: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        todolistId,
        title,
    } as const
}
export const AddTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        title,
    } as const
}

export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        todolistId,
        filter,
    } as const
}
