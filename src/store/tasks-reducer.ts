import { Dispatch } from "redux"
import { v1 } from "uuid"
import { tasksAPI } from "../api/API"
import { TaskPriorities, TaskResponseType, TaskStatuses, TasksType, UpdateTaskModel } from "../types"
import { AddTodolistActionType, GetTodolistsActionType, RemoveTodolistActionType } from "./todolists-reducer"
import { AppRootStateType } from "./store"

type InitialStateType = TasksType
const initialState: InitialStateType = {}

export const tasksReducer = (state = initialState, action: ActionsType | AddTodolistActionType | RemoveTodolistActionType | GetTodolistsActionType): InitialStateType => {
    switch (action.type) {
        case 'REMOVE_TASK': return {
            ...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)
        }
        case 'ADD_TASK': return {
            ...state, [action.todolistId]: [{ id: v1(), title: action.value, description: '', status: TaskStatuses.New, priority: 1, startDate: '', addedDate: '', order: 0, todoListId: '', deadline: '' }, ...state[action.todolistId]]
        }
        case 'CHANGE_TASK_STATUS': return {
            ...state, [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? { ...task, status: action.value } : task)
        }
        case 'CHANGE_TASK_TITLE': return {
            ...state, [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? { ...task, title: action.value } : task)
        }
        case 'ADD_TODOLIST': return {
            ...state, [action.todolist.id]: []
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
        case 'SET_TASKS': return { ...state, [action.todolistId]: action.tasks }

        default: return state
    }
}

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type GetTasksActionType = ReturnType<typeof getTasksAC>

type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | GetTasksActionType;

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
export const getTasksAC = (todolistId: string, tasks: Array<TaskResponseType>) => {
    return {
        type: 'SET_TASKS',
        todolistId,
        tasks,
    } as const
}

export const fetchTasksThunk = (todolistId: string) => (dispatch: Dispatch) => {
    tasksAPI.get(todolistId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(getTasksAC(todolistId, tasks))
        })
}

export const addTaskThunk = (todolistId: string, value: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.create(todolistId, value)
            .then((res) => {
                dispatch(addTaskAC(todolistId, res.data.data.item.title))
            })
    }
}

export const updateTaskTitleThunk = (todolistId: string, taskId: string, value: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

        const localState = getState()
        const task = localState.tasks[todolistId].find(task => task.id === taskId)

        if (!task) {
            return
        }

        const updateModel: UpdateTaskModel = {
            title: value,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
        }
        tasksAPI.update(todolistId, taskId, updateModel)
            .then(res => {
                dispatch(changeTaskTitleAC(todolistId, taskId, value))
                // dispatch(getTodolistsAC(res.data))
            })
    }
}
export const updateTaskStatusThunk = (todolistId: string, taskId: string, value: TaskStatuses) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

        const localState = getState()
        const task = localState.tasks[todolistId].find(task => task.id === taskId)

        if (!task) {
            return
        }

        const updateModel: UpdateTaskModel = {
            title: task.title,
            description: task.description,
            status: value,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
        }

        tasksAPI.update(todolistId, taskId, updateModel)
            .then(res => {
                dispatch(changeTaskStatusAC(todolistId, taskId, value))
                // dispatch(getTodolistsAC(res.data))
            })
    }
}
