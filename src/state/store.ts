import {combineReducers, createStore} from 'redux'
import {tasksReducer} from "./reducers/tasks-reducer";
import {todolistReducer} from "./reducers/todolist-reducer";

const rootReducer = combineReducers({
    tasksReducer,
    todolistReducer,
})
export const store = createStore(rootReducer)


export type AppStateType = ReturnType<typeof rootReducer>
