type Nullable<T> = null | T

export type FilterValuesType = 'All' | 'Active' | 'Completed'

export type TodolistType = {
    filter: FilterValuesType
} & TodolistResponseType

export type TasksType = {
    [key: string]: Array<TaskResponseType>
}

export type TodolistResponseType = {
    id: string
    addedDate: Nullable<string>
    order: Nullable<number>
    title: string
}

export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}
export type GetTasksResponseType<D = []> = {
    error: Nullable<string>
    totalCount: number
    items: D
}
export type TasksResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}

export type TaskResponseType = {
    description: Nullable<string>
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: Nullable<string>
    deadline: Nullable<string>
    id: string
    todoListId: Nullable<string>
    order: Nullable<number>
    addedDate: Nullable<string>
}

export type UpdateTaskModel = {
    title?: Nullable<string>
    description?: Nullable<string>
    status?: Nullable<number>
    priority?: Nullable<number>
    startDate?: Nullable<string>
    deadline?: Nullable<string>
}
