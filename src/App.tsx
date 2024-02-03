import './App.css';
import { Todolist } from './Todolist';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
export type TasksType = Array<TaskType>

export const App = () => {

    const tasks1: TasksType = [
        { id: 1, title: 'HTML & CSS', isDone: true },
        { id: 2, title: 'JS', isDone: false },
        { id: 3, title: 'React', isDone: false },
    ];

    const tasks2: TasksType = [
        { id: 1, title: 'Bread', isDone: true },
        { id: 2, title: 'Milk', isDone: false },
        { id: 3, title: 'Butter', isDone: false },
        { id: 4, title: 'Coca-cola', isDone: false },
    ];

    return (
        <div className="App">
            <Todolist tasks={tasks1} title={'What to learn'} />
            <Todolist tasks={tasks2} title={'What to buy'} />
            {/* <div>
                <h3>What to learn</h3>
                <div>
                    <input />
                    <button>+</button>
                </div>
                <ul>
                    <li><input type="checkbox" checked={true} /><span>HTML&CSS</span></li>
                    <li><input type="checkbox" checked={true} /><span>JS</span></li>
                    <li><input type="checkbox" checked={false} /><span>React</span></li>
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div> */}
        </div>
    );
}
