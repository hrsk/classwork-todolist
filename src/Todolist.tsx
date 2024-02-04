import { TasksType } from "./App"

type PropsType = {
    title: string
    tasks: TasksType
    removeTask: (taskId: number) => void
}

export const Todolist = (props: PropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input />
                <button>+</button>
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
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}
