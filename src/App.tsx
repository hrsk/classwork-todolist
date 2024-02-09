import { ChangeEvent, useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { Todolist } from './Todolist';
import { FilterValuesType, TasksType, TodolistType } from './types';

export const App = () => {

    const todolistId1 = v1();
    const todolistId2 = v1();

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        { id: todolistId1, title: 'What to learn', filter: 'All' },
        { id: todolistId2, title: 'What to buy', filter: 'All' },
    ]);

    const [tasks, setTasks] = useState<TasksType>({
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
        setTasks({ ...tasks, [todolistId]: [{ id: v1(), title: value, isDone: false }, ...tasks[todolistId]] })
    }

    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId) });
    }

    const changeTasksFilter = (todolistId: string, value: FilterValuesType) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? { ...todolist, filter: value } : todolist))
    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? { ...task, isDone } : task) })
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        delete tasks[todolistId]
        setTasks({ ...tasks })
    }

    const addTodolist = (value: string) => {
        const todolistId = v1()
        setTodolists([{ id: todolistId, title: value, filter: 'All' }, ...todolists])
        setTasks({ ...tasks, [todolistId]: [] })
        setValue('')
    }

    const changeTodolistTitle = (todolistId: string, value: string) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? { ...todolist, title: value } : todolist))
    }

    const changeTaskTitle = (todolistId: string, taskId: string, value: string) => {
        setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? { ...task, title: value } : task) })
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
