import { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksType = Array<TaskType>
export type FilterValuesType = 'All' | 'Active' | 'Completed'

export const App = () => {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        { id: v1(), title: 'HTML & CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: false },
        { id: v1(), title: 'React', isDone: false },
    ]);

    const [filter, setFilter] = useState<FilterValuesType>('All');

    const addTask = (value: string) => {
        setTasks([{ id: v1(), title: value, isDone: false }, ...tasks])
    }

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    }

    const changeTasksFilter = (value: FilterValuesType) => {
        setFilter(value);
    }

    let filteredTasks = tasks;
    if (filter === 'Active') {
        filteredTasks = tasks.filter(task => !task.isDone)
    }
    if (filter === 'Completed') {
        filteredTasks = tasks.filter(task => task.isDone)
    }

    return (
        <div className="App">
            <Todolist tasks={filteredTasks}
                title={'What to learn'}
                addTask={addTask}
                removeTask={removeTask}
                changeTasksFilter={changeTasksFilter} />
        </div>
    );
}
