import React from 'react'
import { Provider } from "react-redux";
import { AppRootStateType, store } from "../../store/store";
import { combineReducers, createStore } from "redux";
import { tasksReducer } from '../../store/tasks-reducer';
import { todolistsReducer } from "../../store/todolists-reducer";
import { v1 } from "uuid";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const todolistId1 = v1()
const todolistId2 = v1()

const initialGlobalState: AppRootStateType = {
    todolists: [
        { id: todolistId1, title: "What to learn", filter: 'All' },
        { id: todolistId2, title: "What to buy", filter: 'All' },
    ],
    tasks: {
        [todolistId1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: false }
        ],
        [todolistId2]: [
            { id: v1(), title: "Milk", isDone: false },
            { id: v1(), title: "React Book", isDone: true }
        ],
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as any);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}