import { ChangeEvent, useState } from "react"
import { FilterValuesType, TasksType } from "./App"

type PropsType = {
    title: string
    tasks: TasksType
    addTask: (value: string) => void
    removeTask: (taskId: string) => void
    changeTasksFilter: (value: FilterValuesType) => void
}

export const Todolist = (props: PropsType) => {

    const [value, setValue] = useState<string>('');

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const addTask = () => {
        props.addTask(value)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={value} onChange={onChangeHandler} />
                <button onClick={addTask}>+</button>
            </div>
            <ul style={{ listStyle: 'none' }}>
                {
                    props.tasks.map((task) => {
                        return (
                            <li key={task.id}>
                                <button onClick={() => props.removeTask(task.id)}>x</button>
                                <input type="checkbox" checked={task.isDone} /><span>{task.title}</span>
                            </li>
                        )
                    }
                    )
                }
            </ul>
            {/* <ul>
                <li><input type="checkbox" checked={props.tasks[0].isDone} /><span>{props.tasks[0].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[1].isDone} /><span>{props.tasks[1].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[2].isDone} /><span>{props.tasks[2].title}</span></li>
            </ul> */}
            <div>
                <button onClick={() => props.changeTasksFilter('All')}>All</button>
                <button onClick={() => props.changeTasksFilter('Active')}>Active</button>
                <button onClick={() => props.changeTasksFilter('Completed')}>Completed</button>
            </div>
        </div>
    )
}
