import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type TasksType = {
    id: number,
    title: string,
    isDone: boolean
}

export const App = (): JSX.Element => {
//JSX
    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: false},
        {id: 3, title: "React", isDone: true},
    ])
    const removeTask = (taskId: number) => {
        setTasks(tasks.filter((f) => f.id !== taskId))
    }
    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={tasks}
                removeTask={removeTask}
            />
        </div>
    );
}

