import { useDispatch } from 'react-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { thunk } from 'redux-thunk'
import { tasksReducer } from './tasks-reducer'
import { todolistsReducer } from './todolists-reducer'

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk) as any)

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch | any;

// export type AsyncAction = (dispatch: (action: Action) => any) => void;
// export type Dispatcher = (action: AsyncAction | Action) => void
// export const useAppDispatch: () => Dispatcher = useDispatch as any;
export const useAppDispatch: () => AppDispatch = useDispatch;


// @ts-ignore
window.store = store
