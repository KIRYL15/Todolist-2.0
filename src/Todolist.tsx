import React, {FC} from 'react';
import s from './Todolist.module.css'
import {FilterValueType, TasksType} from "./App";

type TodolistType = {
    title: string,
    tasks: Array<TasksType>
    removeTask: (taskId: number) => void,
    changeTodolistFilter: (filter: FilterValueType) => void

}
export const Todolist: FC<TodolistType> = (props) => {
    const onClickButtonAll = () => props.changeTodolistFilter("all")
    const onClickButtonActive = () => props.changeTodolistFilter("active")
    const onClickButtonCompleted = () => props.changeTodolistFilter("completed")

    const todolistItems = props.tasks.map((m) => {
        return (
            <li key={m.id}>
                <input type="checkbox" checked={m.isDone}/>
                <span>{m.title}</span>
                <button onClick={() => {
                    props.removeTask(m.id)}}>X</button>
            </li>
        )
    })
    return (
        <div className={s.Todolist}>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button onClick={() => {
                    console.log(props.tasks)
                }}>+
                </button>
            </div>
            <ul>
                {todolistItems}
            </ul>
            <div>
                <button onClick={onClickButtonAll}>All</button>
                <button onClick={onClickButtonActive}>Active</button>
                <button onClick={onClickButtonCompleted}>Completed</button>
            </div>
        </div>
    );
};

