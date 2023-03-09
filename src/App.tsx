import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}
export type FilterValueType = "all" | "active" | "completed"

export const App = (): JSX.Element => {
//JSX
    const [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "React", isDone: true},
        {id: v1(), title: "REDUX", isDone: false},
    ])
    const removeTask = (taskId: string) => {
        setTasks(tasks.filter((f) => f.id !== taskId))
    }
    const changeTodolistFilter = (filter: FilterValueType) => {
        setFilter(filter)
    }
    const addTask = (newTitle: string) => {
        const newTask = {
            id: v1(),
            title: newTitle,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }
    const [filter, setFilter] = useState<FilterValueType>("all")
    let tasksForRender: Array<TasksType> = []
    if (filter === "all") {
        tasksForRender = tasks
    }
    if (filter === "active") {
        tasksForRender = tasks.filter(t => !t.isDone)
    }
    if (filter === "completed") {
        tasksForRender = tasks.filter(t => t.isDone)
    }

    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeTodolistFilter={changeTodolistFilter}
                addTask={addTask}
            />
        </div>
    );
}

