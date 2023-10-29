import {TodolistType} from "../../index";
import {v1} from "uuid";


type ActionType = {
    type: string
    [key: string]: any
}

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const todolistReducer = (state: TodolistType[], action: ActionType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(td => td.id !== action.id)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(td => td.id === action.id ? {...td, title: action.title} : td)
        case 'ADD-TODOLIST':
            return [
                ...state, {id: v1(), title: action.title, filter: 'All'}
            ]
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(td => td.id === action.id ? {...td, filter: action.filter} : td)
        default:
            throw new Error('I don\'t understand this type')
    }
}
