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
    const changeTodolistFilter = (filter: FilterValueType) => setFilter(filter)
    const addTask = (newTitle: string) => {
        const newTask = {
            id: v1(),
            title: newTitle,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }
    const changeTaskStatus = (tId: string, newIsDone:boolean) => {
        debugger
        setTasks(tasks.map((m) => m.id === tId ? {...m, isDone: newIsDone} : m))
    }
    const [filter, setFilter] = useState<FilterValueType>("all")
    const getFilteredTasks = (tasks: Array<TasksType>, filter: FilterValueType): Array<TasksType> => {
        switch (filter) {
            case "active":
                return tasks.filter(t => !t.isDone)
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }
    const tasksForRender: Array<TasksType> = getFilteredTasks(tasks, filter)
//UI
    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeTodolistFilter={changeTodolistFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />
        </div>
    );
}

