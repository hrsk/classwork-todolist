import { v1 } from 'uuid'
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './tasks-reducer'
import { addTodolistAC } from './todolists-reducer'
import { TasksType } from '../types'

let todolistId1: string
let todolistId2: string

let startState: TasksType

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = {
        [todolistId1]: [
            { id: '1', title: 'CSS', isDone: false },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'React', isDone: false },
        ],
        [todolistId2]: [
            { id: '1', title: 'bread', isDone: false },
            { id: '2', title: 'milk', isDone: true },
            { id: '3', title: 'tea', isDone: false },
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
    expect(endState[todolistId2][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {

    const endState = tasksReducer(startState, changeTaskStatusAC(todolistId2, '2', false))

    expect(endState[todolistId2].length).toBe(3)
    expect(endState[todolistId2][1].id).toBeDefined()
    expect(endState[todolistId2][1].id).toBe('2')
    expect(endState[todolistId2][1].title).toBe('milk')
    expect(endState[todolistId2][1].isDone).toBe(false)
})

test('title of specified task should be changed', () => {

    const endState = tasksReducer(startState, changeTaskTitleAC(todolistId1, '2', 'not JS'))

    expect(endState[todolistId2].length).toBe(3)
    expect(endState[todolistId2][1].id).toBeDefined()
    expect(endState[todolistId1][1].id).toBe('2')
    expect(endState[todolistId1][1].title).toBe('not JS')
    expect(endState[todolistId1][1].isDone).toBe(true)
})

test('new array should be added when new todolist is added', () => {

    const endState = tasksReducer(startState, addTodolistAC('new todolist'))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== todolistId1 && k !== todolistId2)
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})