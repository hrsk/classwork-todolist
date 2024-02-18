import React from 'react'
import { Provider } from "react-redux";
import { AppRootStateType, store } from "../../store/store";
import { combineReducers, createStore } from "redux";
import { tasksReducer } from '../../store/tasks-reducer';
import { todolistsReducer } from "../../store/todolists-reducer";
import { v1 } from "uuid";
import { TaskStatuses } from '../../types';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const todolistId1 = v1()
const todolistId2 = v1()

const initialGlobalState: AppRootStateType = {
    todolists: [
        { id: todolistId1, title: "What to learn", filter: 'All', order: 0, addedDate: '' },
        { id: todolistId2, title: "What to buy", filter: 'All', order: 0, addedDate: '' },
    ],
    tasks: {
        [todolistId1]: [
            { id: v1(), title: "HTML&CSS", description: '', status: TaskStatuses.Completed, priority: 0, startDate: '', addedDate: '', order: 0, todoListId: '', deadline: '' },
            { id: v1(), title: "JS", description: '', status: TaskStatuses.Completed, priority: 0, startDate: '', addedDate: '', order: 0, todoListId: '', deadline: '' }
        ],
        [todolistId2]: [
            { id: v1(), title: "Milk", description: '', status: TaskStatuses.Completed, priority: 0, startDate: '', addedDate: '', order: 0, todoListId: '', deadline: '' },
            { id: v1(), title: "React Book", description: '', status: TaskStatuses.Completed, priority: 0, startDate: '', addedDate: '', order: 0, todoListId: '', deadline: '' }
        ],
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as any);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}