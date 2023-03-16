import React, {FC} from 'react';
import s from './Todolist.module.css'
import {TasksList} from "./TasksList";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {FilterValueType, TasksType} from "./App";

type TodolistType = {
    //данные
    title: string,
    todolistId: string,
    filter: FilterValueType,
    tasks: Array<TasksType>,
    //функции для тасок
    addTask: (newTitle: string, todolistId: string) => void,
    removeTask: (taskId: string, todolistId: string) => void,
    changeTaskTitle: (tId: string, newTitle: string, todolistId: string) => void
    changeTaskStatus: (tId: string, newIsDone: boolean, todolistId: string) => void,
    //функции для тудулистов
    removeTodolist: (todolistId: string) => void,
    changeTodolistTitle: (title: string, todolistId: string) => void,
    changeTodolistFilter: (filter: FilterValueType, todolistId: string) => void,

}
export const Todolist: FC<TodolistType> = (props) => {
//функция которая в параметрах принимает filter и возвращает функцию которая изменит значение на filter
    const handlerCreator = (filter: FilterValueType) => {
        return () => props.changeTodolistFilter(filter, props.todolistId)
    }
    const removeTodolist = () => {
        props.removeTodolist(props.todolistId)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.todolistId)
    }
    const changeTodolistTitle = (title: string) => {
        //debugger
        props.changeTodolistTitle(title, props.todolistId)
    }
    return (
        <div className={s.Todolist}>
            <h3>
                <EditableSpan
                    title={props.title}
                    changeTitle={changeTodolistTitle}/>
                <button onClick={removeTodolist}>X</button>
            </h3>
            <AddItemForm maxLenghtUserMessage={15} addNewItem={addTask}/>
            <TasksList
                todolistId={props.todolistId}
                removeTask={props.removeTask}
                tasks={props.tasks}
                changeTaskStatus={props.changeTaskStatus}
                changeTaskTitle={props.changeTaskTitle}

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

