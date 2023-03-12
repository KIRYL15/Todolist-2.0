import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import s from './Todolist.module.css'
import {FilterValueType, TasksType} from "./App";
import {TasksList} from "./TasksList";

type TodolistType = {
    title: string,
    tasks: Array<TasksType>,
    removeTask: (taskId: string) => void,
    changeTodolistFilter: (filter: FilterValueType) => void,
    addTask: (newTitle: string) => void,
    changeTaskStatus: (tId: string, newIsDone: boolean) => void,
    filter: FilterValueType
}
export const Todolist: FC<TodolistType> = (props) => {
    const [titleForInput, setTitleForInput] = useState<string>('')
    const [error, setError] = useState(false)
    const maxLenghtUserMessage: number = 15
    const isUserMessageToLong: boolean = titleForInput.length > maxLenghtUserMessage
//функция которая в параметрах принимает filter и возвращает функцию которая изменит значение на filter
    const handlerCreator = (filter: FilterValueType) => {
        return () => props.changeTodolistFilter(filter)
    }

    const onClickHandler = () => {
        const trimedTitle = titleForInput.trim()
        if (trimedTitle) {
            props.addTask(trimedTitle)
        } else {
            setError(true)
        }
        setTitleForInput('')
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitleForInput(e.currentTarget.value)
    }
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && onClickHandler()
    const inputErrorClasses = error || isUserMessageToLong ? s.InputError : ""
    const userMaxLenghtMessage = isUserMessageToLong && <div style={{color: "hotpink"}}>Task title is long</div>
    const userErrorMessage = error && <div style={{color: "red"}}>Title is required</div>
    const isAddButtonDisabled = isUserMessageToLong || titleForInput.length === 0
    return (
        <div className={s.Todolist}>
            <h3>{props.title}</h3>
            <div>
                <input
                    className={inputErrorClasses}
                    placeholder={"Please enter title"}
                    value={titleForInput}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownAddTask}
                />
                <button
                    disabled={isAddButtonDisabled}
                    onClick={onClickHandler}>+
                </button>
                {userMaxLenghtMessage}
                {userErrorMessage}
            </div>
            <ul>
                <TasksList
                    removeTask={props.removeTask}
                    tasks={props.tasks}
                    changeTaskStatus={props.changeTaskStatus}
                />
            </ul>
            <div>
                <button
                    className={props.filter === "all" ? s.ActiveFilter : s.ActiveFilterNone}
                    onClick={handlerCreator("all")}>All
                </button>
                <button
                    className={props.filter === "active" ? s.ActiveFilter : s.ActiveFilterNone}
                    onClick={handlerCreator("active")}>Active
                </button>
                <button
                    className={props.filter === "completed" ? s.ActiveFilter : s.ActiveFilterNone}
                    onClick={handlerCreator("completed")}>Completed
                </button>
            </div>
        </div>
    );
};

