import { thunk } from 'redux-thunk'
import { tasksReducer } from './tasks-reducer'
import { todolistsReducer } from './todolists-reducer'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { useDispatch } from 'react-redux'

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk) as any)

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch | any;

export const useAppDispatch: () => AppDispatch = useDispatch;


// @ts-ignore
window.store = store
