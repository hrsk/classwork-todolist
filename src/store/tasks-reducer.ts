import { v1 } from "uuid"
import { TaskStatuses, TasksType } from "../types"
import { AddTodolistActionType, GetTodolistsActionType, RemoveTodolistActionType } from "./todolists-reducer"

type InitialStateType = TasksType
const initialState: InitialStateType = {}

export const tasksReducer = (state = initialState, action: ActionsType | AddTodolistActionType | RemoveTodolistActionType | GetTodolistsActionType): InitialStateType => {
    switch (action.type) {
        case 'REMOVE_TASK': return {
            ...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)
        }
        case 'ADD_TASK': return {
            ...state, [action.todolistId]: [{ id: v1(), title: action.value, description: '', status: TaskStatuses.Completed, priority: 1, startDate: '', addedDate: '', order: 0, todoListId: '', deadline: '' }, ...state[action.todolistId]]
        }
        case 'CHANGE_TASK_STATUS': return {
            ...state, [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? { ...task, status: action.value } : task)
        }
        case 'CHANGE_TASK_TITLE': return {
            ...state, [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? { ...task, title: action.value } : task)
        }
        case 'ADD_TODOLIST': return {
            ...state, [action.todolistId]: []
        }
        case 'REMOVE_TODOLIST': {
            delete state[action.todolistId]
            return { ...state }
        }
        case 'GET_TODOLISTS': {
            const stateCopy = { ...state }
            action.todolists.forEach((td) => {
                stateCopy[td.id] = []
            })
            return stateCopy;
        }

        default: return state
    }
}

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType;

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE_TASK',
        todolistId,
        taskId,
    } as const
}

export const addTaskAC = (todolistId: string, value: string) => {
    return {
        type: 'ADD_TASK',
        todolistId,
        value,
    } as const
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, value: TaskStatuses) => {
    return {
        type: 'CHANGE_TASK_STATUS',
        todolistId,
        taskId,
        value,
    } as const
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, value: string) => {
    return {
        type: 'CHANGE_TASK_TITLE',
        todolistId,
        taskId,
        value,
    } as const
}
