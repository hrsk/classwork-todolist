import {TasksType, TaskType} from "../../index";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolist-reducer";

const initialState: TasksType = {}

export const tasksReducer = (state = initialState, action: ActionsType | AddTodolistActionType | RemoveTodolistActionType): TasksType => {
    switch (action.type) {
        case 'REMOVE_TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter((task: TaskType) => task.id !== action.taskId)
            }
        case 'ADD_TASK':
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.value, isDone: false}, ...state[action.todolistId]]

            }
        case 'CHANGE_TASK_STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {
                    ...task,
                    isDone: action.isDone
                } : task)
            }
        case 'CHANGE_TASK_TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {
                    ...task,
                    title: action.value
                } : task)
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolistId]: []
            }
        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.todolistId]
            return copyState
        default:
            return state
    }
}

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type AddTaskActionType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType

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
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {
        type: 'CHANGE_TASK_STATUS',
        todolistId,
        taskId,
        isDone,
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