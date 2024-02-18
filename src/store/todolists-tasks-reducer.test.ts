import { v1 } from "uuid"
import { tasksReducer } from "./tasks-reducer"
import { addTodolistAC, removeTodolistAC, todolistsReducer } from "./todolists-reducer"
import { TaskStatuses, TasksType, TodolistType } from "../types"

let todolistId1: string
let todolistId2: string

let startState: TasksType

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = {
        [todolistId1]: [
            { id: '1', title: 'CSS', description: '', status: TaskStatuses.Completed, priority: 0, startDate: '', addedDate: '', order: 0, todoListId: '', deadline: '' },
            { id: '2', title: 'JS', description: '', status: TaskStatuses.Completed, priority: 0, startDate: '', addedDate: '', order: 0, todoListId: '', deadline: '' },
            { id: '3', title: 'React', description: '', status: TaskStatuses.Completed, priority: 0, startDate: '', addedDate: '', order: 0, todoListId: '', deadline: '' },
        ],
        [todolistId2]: [
            { id: '1', title: 'bread', description: '', status: TaskStatuses.Completed, priority: 0, startDate: '', addedDate: '', order: 0, todoListId: '', deadline: '' },
            { id: '2', title: 'milk', description: '', status: TaskStatuses.Completed, priority: 0, startDate: '', addedDate: '', order: 0, todoListId: '', deadline: '' },
            { id: '3', title: 'tea', description: '', status: TaskStatuses.Completed, priority: 0, startDate: '', addedDate: '', order: 0, todoListId: '', deadline: '' },
        ],
    }
})

test('ids should be equals', () => {

    const startTasksState: TasksType = {}
    const startTodolistsState: Array<TodolistType> = []

    const action = addTodolistAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodolists).toBe(action.todolistId)
})

test('property with todolistId should be deleted', () => {

    const endState = tasksReducer(startState, removeTodolistAC(todolistId2))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState[todolistId2]).not.toBeDefined()
})
