import { addTodolistAC, changeTodolistAC, changeTodolistFilterAC, removeTodolistAC, todolistsReducer } from './todolists-reducer'
import { v1 } from 'uuid'
import { TodolistType } from './types'

let todolistId1: string
let todolistId2: string

let startState: Array<TodolistType>

beforeEach(() => {

    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        { id: todolistId1, title: 'What to learn', filter: 'All' },
        { id: todolistId2, title: 'What to buy', filter: 'All' },
    ]
})
test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {

    const endState = todolistsReducer(startState, addTodolistAC('newTodolistTitle'))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('newTodolistTitle')
})

test('correct todolist should change its name', () => {

    const endState = todolistsReducer(startState, changeTodolistAC(todolistId2, 'todolist title is changed'))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('todolist title is changed')
})


test('correct filter of todolist should be changed', () => {

    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, 'Completed'))

    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe('Completed')
})
