import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type TasksType = {
    id: number,
    title: string,
    isDone: boolean
}
export type FilterValueType = "all" | "active" | "completed"


export const App = (): JSX.Element => {
//JSX
    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: false},
        {id: 3, title: "React", isDone: true},
        {id: 4, title: "REDUX", isDone: false},
    ])
    const removeTask = (taskId: number) => {
        setTasks(tasks.filter((f) => f.id !== taskId))
    }
    const changeTodolistFilter = (filter: FilterValueType) => {
        setFilter(filter)
    }

    const [filter, setFilter] = useState<FilterValueType>("all")
    let tasksForRender: Array<TasksType> = []
    if (filter === "all") {
        tasksForRender = tasks
    }
    if (filter === "active") {
        tasksForRender = tasks.filter(t => t.isDone === false)
    }
    if (filter === "completed") {
        tasksForRender = tasks.filter(t => t.isDone === true)
    }

    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeTodolistFilter={changeTodolistFilter}
            />
        </div>
    );
}

