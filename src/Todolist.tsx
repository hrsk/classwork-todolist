import { ChangeEvent, useState, KeyboardEvent } from "react"
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
        if (value !== '') {
            props.addTask(value)
            setValue('')
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={value}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyPressHandler} />
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
            <div>
                <button onClick={() => props.changeTasksFilter('All')}>All</button>
                <button onClick={() => props.changeTasksFilter('Active')}>Active</button>
                <button onClick={() => props.changeTasksFilter('Completed')}>Completed</button>
            </div>
        </div>
    )
}
