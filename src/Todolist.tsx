import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import s from './Todolist.module.css'
import {FilterValueType, TasksType} from "./App";
import {TasksList} from "./TasksList";

type TodolistType = {
    //данные
    todolistId:string
    title: string,
    tasks: Array<TasksType>,
    filter: FilterValueType
    //функции для тасок
    removeTask: (taskId: string, todolistId: string) => void,
    addTask: (newTitle: string, todolistId: string) => void,
    changeTaskStatus: (tId: string, newIsDone: boolean, todolistId: string) => void,
    //функции для тудулистов
    changeTodolistFilter: (filter: FilterValueType, todolistId: string) => void,
    removeTodolist: (todolistId: string) => void
}
export const Todolist: FC<TodolistType> = (props) => {
    const [titleForInput, setTitleForInput] = useState<string>('')
    const [error, setError] = useState(false)
    const maxLenghtUserMessage: number = 15
    const isUserMessageToLong: boolean = titleForInput.length > maxLenghtUserMessage
//функция которая в параметрах принимает filter и возвращает функцию которая изменит значение на filter
    const handlerCreator = (filter: FilterValueType) => {
        return () => props.changeTodolistFilter(filter, props.todolistId)
    }
const removeTodolist=()=>{props.removeTodolist(props.todolistId)}

    const onClickHandler = () => {
        const trimedTitle = titleForInput.trim()
        if (trimedTitle) {
            props.addTask(trimedTitle, props.todolistId)
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
            <h3>{props.title}
             <button onClick={removeTodolist}>X</button>
            </h3>
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
                <TasksList
                    todolistId={props.todolistId}
                    removeTask={props.removeTask}
                    tasks={props.tasks}
                    changeTaskStatus={props.changeTaskStatus}
                />
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

