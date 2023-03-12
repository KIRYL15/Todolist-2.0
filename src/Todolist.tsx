import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import s from './Todolist.module.css'
import {FilterValueType, TasksType} from "./App";
import {TasksList} from "./TasksList";

type TodolistType = {
    title: string,
    tasks: Array<TasksType>
    removeTask: (taskId: string) => void,
    changeTodolistFilter: (filter: FilterValueType) => void
    addTask: (newTitle: string) => void
}
export const Todolist: FC<TodolistType> = (props) => {
    const [titleForInput, setTitleForInput] = useState<string>('')
    const onClickButtonAll = () => props.changeTodolistFilter("all")
    const onClickButtonActive = () => props.changeTodolistFilter("active")
    const onClickButtonCompleted = () => props.changeTodolistFilter("completed")
    const onClickHandler = () => {
        props.addTask(titleForInput)
        setTitleForInput('')
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitleForInput(e.currentTarget.value)
    const onKeyDownAddTask = (e:KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && onClickHandler()
    return (
        <div className={s.Todolist}>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={titleForInput}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownAddTask}
                />
                <button onClick={onClickHandler}>+</button>
                {titleForInput.length > 15 && <div style={{color: "hotpink"}}>Task title is long</div>}
            </div>
            <ul>
                <TasksList
                    removeTask={props.removeTask}
                    tasks={props.tasks}/>
            </ul>
            <div>
                <button onClick={onClickButtonAll}>All</button>
                <button onClick={onClickButtonActive}>Active</button>
                <button onClick={onClickButtonCompleted}>Completed</button>
            </div>
        </div>
    );
};

