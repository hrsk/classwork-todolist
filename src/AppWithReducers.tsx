import { ChangeEvent, useReducer, useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { Todolist } from './Todolist';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './tasks-reducer';
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer } from './todolists-reducer';
import { FilterValuesType } from './types';

export const AppWithReducers = () => {

    const todolistId1 = v1();
    const todolistId2 = v1();

    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        { id: todolistId1, title: 'What to learn', filter: 'All' },
        { id: todolistId2, title: 'What to buy', filter: 'All' },
    ]);

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            { id: v1(), title: 'HTML & CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: false },
            { id: v1(), title: 'React', isDone: false },
        ],
        [todolistId2]: [
            { id: v1(), title: 'HTML & CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: false },
            { id: v1(), title: 'React', isDone: false },
        ],
    });

    const [value, setValue] = useState<string>('');

    const addTask = (todolistId: string, value: string) => {
        const action = addTaskAC(todolistId, value)
        dispatchToTasks(action)
    }

    const removeTask = (todolistId: string, taskId: string) => {
        const action = removeTaskAC(todolistId, taskId)
        dispatchToTasks(action);
    }

    const changeTasksFilter = (todolistId: string, value: FilterValuesType) => {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatchToTodolists(action)
    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        const action = changeTaskStatusAC(todolistId, taskId, isDone)
        dispatchToTasks(action)
    }

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    const addTodolist = (value: string) => {
        const action = addTodolistAC(value)
        dispatchToTodolists(action)
        dispatchToTasks(action)
        setValue('')
    }

    const changeTodolistTitle = (todolistId: string, value: string) => {
        const action = changeTodolistTitleAC(todolistId, value)
        dispatchToTodolists(action)
    }

    const changeTaskTitle = (todolistId: string, taskId: string, value: string) => {
        const action = changeTaskTitleAC(todolistId, taskId, value)
        dispatchToTasks(action)
    }

    return (
        <div className="App">
            <div>
                <input value={value} onChange={(e: ChangeEvent<HTMLInputElement>) => { setValue(e.currentTarget.value) }} />
                <button onClick={() => addTodolist(value)}>+</button>
            </div>
            {
                todolists.map(todolist => {

                    let filteredTasks = tasks[todolist.id];
                    if (todolist.filter === 'Active') {
                        filteredTasks = tasks[todolist.id].filter(task => !task.isDone)
                    }
                    if (todolist.filter === 'Completed') {
                        filteredTasks = tasks[todolist.id].filter(task => task.isDone)
                    }

                    return (
                        <Todolist
                            key={todolist.id}
                            todolistId={todolist.id}
                            tasks={filteredTasks}
                            title={todolist.title}
                            filter={todolist.filter}
                            addTask={addTask}
                            removeTask={removeTask}
                            changeTasksFilter={changeTasksFilter}
                            changeTaskStatus={changeTaskStatus}
                            removeTodolist={removeTodolist}
                            changeTodolistTitle={changeTodolistTitle}
                            changeTaskTitle={changeTaskTitle} />
                    )
                })}
        </div>
    );
}
