import { Dispatch } from "redux"
import { todolistAPI } from "../api/API"
import { FilterValuesType, TodolistResponseType, TodolistType } from "../types"

type InitialStateType = Array<TodolistType>
const initialState: InitialStateType = []

export const todolistsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'REMOVE_TODOLIST': return state.filter(todolist => todolist.id !== action.todolistId)
        // case 'ADD_TODOLIST': return [{ id: action.todolistId, title: action.value, filter: 'All', order: 0, addedDate: '' }, ...state]
        case 'ADD_TODOLIST': return [{ ...action.todolist, filter: 'All' }, ...state]
        case 'CHANGE_TODOLIST_TITLE': return state.map(todolist => todolist.id === action.todolistId ? { ...todolist, title: action.value } : todolist)
        case 'CHANGE_TODOLIST_FILTER': return state.map(todolist => todolist.id === action.todolistId ? { ...todolist, filter: action.value } : todolist)
        case 'GET_TODOLISTS': {
            return action.todolists.map(td => ({ ...td, filter: 'All' }))
        }
        default: return state
    }
}

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type GetTodolistsActionType = ReturnType<typeof getTodolistsAC>

type ActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | GetTodolistsActionType;

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE_TODOLIST',
        todolistId,
    } as const
}

// export const addTodolistAC = (value: string) => {
//     return {
//         type: 'ADD_TODOLIST',
//         todolistId: v1(),
//         value,
//     } as const
// }
export const addTodolistAC = (todolist: TodolistResponseType) => {
    return {
        type: 'ADD_TODOLIST',
        todolist,
    } as const
}

export const changeTodolistTitleAC = (todolistId: string, value: string) => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        todolistId,
        value,
    } as const
}

export const changeTodolistFilterAC = (todolistId: string, value: FilterValuesType) => {
    return {
        type: 'CHANGE_TODOLIST_FILTER',
        todolistId,
        value,
    } as const
}
export const getTodolistsAC = (todolists: Array<TodolistResponseType>) => {
    return {
        type: 'GET_TODOLISTS',
        todolists
    } as const
}

export const fetchTodolistsThunkCreator = () => {
    return (dispatch: Dispatch) => {
        todolistAPI.get()
            .then(res => {
                dispatch(getTodolistsAC(res.data))
            })
    }
}

export const addTodolistThunk = (value: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.create(value)
            .then(res => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}
export const removeTodolistThunk = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.delete(todolistId)
            .then(res => {
                dispatch(removeTodolistAC(todolistId))
            })
    }
}
export const updateTodolistThunk = (todolistId: string, value: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.update(todolistId, value)
            .then(res => {
                dispatch(changeTodolistTitleAC(todolistId, value))
            })
    }
}