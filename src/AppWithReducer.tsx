import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {FilterValuesType} from "./index";
import {v1} from 'uuid';
import {InputWithButton} from "./input_with_button/InputWithButton";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./state/reducers/tasks-reducer";
import {
    addTodolistAC,
    changeTodolistFilterAC, changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./state/reducers/todolist-reducer";

export const AppWithReducer = () => {

    const todolistID1 = v1();
    const todolistID2 = v1();

    const [tasks, setTasksDispatch] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ]
    });

    const [lists, setListsDispatch] = useReducer(todolistReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ]);

    const [value, setValue] = useState<string>('');

    const removeTask = (todolistId: string, taskId: string) => {
        setTasksDispatch(removeTaskAC(todolistId, taskId))
        // setTasks({
        //     ...tasks,
        //     [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)
        // })
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasksDispatch(changeTaskStatusAC(todolistId, taskId, isDone))
        // setTasks({
        //     ...tasks,
        //     [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone} : task)
        // })
    }

    const changeTaskFilter = (todolistId: string, filter: FilterValuesType) => {
        setListsDispatch(changeTodolistFilterAC(todolistId, filter))
        // setLists(lists.map(td => td.id === todolistId ? {...td, filter} : td))
    }

    const addTask = (todolistId: string, value: string) => {
        setTasksDispatch(addTaskAC(todolistId, value))
        // setTasks({
        //     ...tasks, [todolistId]: [{id: v1(), title: value, isDone: false}, ...tasks[todolistId]]
        // })
    }

    const addTodolist = (value: string) => {
        // const todolistId = v1();
        // setLists([...lists, {id: todolistId, title: value, filter: 'All'}])
        // setTasks({...tasks, [todolistId]: []})
        const action = addTodolistAC(value)
        setListsDispatch(action)
        setTasksDispatch(action)
    }

    const addTodolistCallback = () => {
        addTodolist(value)
        setValue('')
    }

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        setListsDispatch(action)
        setTasksDispatch(action)
        // setLists(lists.filter(td => td.id !== todolistId))
        // delete tasks[todolistId]
        // setTasks(tasks)
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasksDispatch(changeTaskTitleAC(todolistId, taskId, title))
        // setTasks({
        //     ...tasks,
        //     [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title} : task)
        // })
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        setListsDispatch(changeTodolistTitleAC(todolistId, title))
        // setLists(lists.map(td => td.id === todolistId ? {...td, title} : td))
    }

    return (
        <div className="App">
            <InputWithButton value={value}
                             setValue={setValue}
                             callbackButtonHandler={addTodolistCallback}
                             name={'+'}
            />
            {
                lists.map(todolist => {

                        let todolistTasks = tasks[todolist.id]

                        return (
                            <Todolist key={todolist.id}
                                      todolistId={todolist.id}
                                      title={todolist.title}
                                      tasks={todolistTasks}
                                      removeTask={removeTask}
                                      changeTaskStatus={changeTaskStatus}
                                      filter={todolist.filter}
                                      changeFilter={changeTaskFilter}
                                      addTask={addTask}
                                      addTodolist={addTodolist}
                                      removeTodolist={removeTodolist}
                                      changeTaskTitle={changeTaskTitle}
                                      changeTodolistTitle={changeTodolistTitle}
                            />
                        )
                    }
                )}
        </div>
    );
}