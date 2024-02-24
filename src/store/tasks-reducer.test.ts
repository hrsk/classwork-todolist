import { v1 } from 'uuid'
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './tasks-reducer'
import { addTodolistAC } from './todolists-reducer'
import { TaskStatuses, TasksType } from '../types'

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
test('correct task should be deleted from correct array', () => {

    const endState = tasksReducer(startState, removeTaskAC(todolistId2, '2'))


    expect(endState[todolistId1].length).toBe(3)
    expect(endState[todolistId2].length).toBe(2)
    expect(endState[todolistId2][0].title).toBe('bread')
    expect(endState[todolistId2][1].title).toBe('tea')
})

test('correct task should be added to correct array', () => {

    const endState = tasksReducer(startState, addTaskAC(todolistId2, 'juice'))

    expect(endState[todolistId1].length).toBe(3)
    expect(endState[todolistId2].length).toBe(4)
    expect(endState[todolistId2][0].id).toBeDefined()
    expect(endState[todolistId2][0].title).toBe('juice')
    expect(endState[todolistId2][0].status).toBe(0)
})

test('status of specified task should be changed', () => {

    const endState = tasksReducer(startState, changeTaskStatusAC(todolistId2, '2', TaskStatuses.New))

    expect(endState[todolistId2].length).toBe(3)
    expect(endState[todolistId2][1].id).toBeDefined()
    expect(endState[todolistId2][1].id).toBe('2')
    expect(endState[todolistId2][1].title).toBe('milk')
    expect(endState[todolistId2][1].status).toBe(TaskStatuses.New)
})

test('title of specified task should be changed', () => {

    const endState = tasksReducer(startState, changeTaskTitleAC(todolistId1, '2', 'not JS'))

    expect(endState[todolistId2].length).toBe(3)
    expect(endState[todolistId2][1].id).toBeDefined()
    expect(endState[todolistId1][1].id).toBe('2')
    expect(endState[todolistId1][1].title).toBe('not JS')
    expect(endState[todolistId1][1].status).toBe(2)
})

// test('new array should be added when new todolist is added', () => {

//     const endState = tasksReducer(startState, addTodolistAC('new todolist'))

//     const keys = Object.keys(endState)
//     const newKey = keys.find(k => k !== todolistId1 && k !== todolistId2)
//     if (!newKey) {
//         throw Error('new key should be added')
//     }

//     expect(keys.length).toBe(3)
//     expect(endState[newKey]).toEqual([])
// })
