import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { store } from "./state/store";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};
export type FilterValuesType = "All" | "Active" | "Completed";

export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};
export type TasksType = {
    [key: string]: TaskType[];
};

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
