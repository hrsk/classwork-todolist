import { v1 } from "uuid"
import { TasksType } from "./types"
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer"

export const tasksReducer = (state: TasksType, action: ActionsType | AddTodolistActionType | RemoveTodolistActionType) => {
    switch (action.type) {
        case 'REMOVE_TASK': return {
            ...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)
        }
        case 'ADD_TASK': return {
            ...state, [action.todolistId]: [{ id: v1(), title: action.value, isDone: false }, ...state[action.todolistId]]
        }
        case 'CHANGE_TASK_STATUS': return {
            ...state, [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? { ...task, isDone: action.value } : task)
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
        default: return state
    }
}

type RemoveTaskActionType = {
    type: 'REMOVE_TASK'
    todolistId: string
    taskId: string
}
type AddTaskActionType = {
    type: 'ADD_TASK'
    todolistId: string
    value: string
}
type ChangeTaskStatusActionType = {
    type: 'CHANGE_TASK_STATUS'
    todolistId: string
    taskId: string
    value: boolean
}
type ChangeTaskTitleActionType = {
    type: 'CHANGE_TASK_TITLE'
    todolistId: string
    taskId: string
    value: boolean
}
type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType;

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE_TASK',
        todolistId,
        taskId,
    }
}

export const addTaskAC = (todolistId: string, value: string): AddTaskActionType => {
    return {
        type: 'ADD_TASK',
        todolistId,
        value,
    }
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, value: boolean): ChangeTaskStatusActionType => {
    return {
        type: 'CHANGE_TASK_STATUS',
        todolistId,
        taskId,
        value,
    }
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, value: boolean): ChangeTaskTitleActionType => {
    return {
        type: 'CHANGE_TASK_TITLE',
        todolistId,
        taskId,
        value,
    }
}
