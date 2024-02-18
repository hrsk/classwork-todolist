export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'All' | 'Active' | 'Completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksType = {
    [key: string]: Array<TaskType>
}

export type TodolistResponseType = {
    id: string
    addedDate: string
    order: number
    title: string
}

// export type CreateTodolistResponseType = {
//     resultCode: number
//     messages: Array<string>
//     fieldsErrors: Array<string>
//     data: {
//         item: TodolistType
//     }
//  }

//  export type UpdateTodolistResponseType = {
//     resultCode: number
//     messages: Array<string>
//     fieldsErrors: Array<string>
//     data: {}
//  }

//  export type DeleteTodolistResponseType = {
//     resultCode: number
//     messages: Array<string>
//     fieldsErrors: Array<string>
//     data: {}
//  }

export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}
export type GetTasksResponseType<D = []> = {
    error: string | null
    totalCount: number
    items: D
}
export type TasksResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}
export type TaskResponseType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskModel = {
    title: string | null
    description: string | null
    completed: boolean
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
}
