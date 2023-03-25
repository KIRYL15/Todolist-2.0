import React, {FC} from 'react';
//import s from './Todolist.module.css'
import {TasksList} from "./TasksList";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {FilterValueType, TasksType} from "./App";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {Button, ButtonGroup, IconButton, Typography} from "@mui/material";

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
        <div>
            <Typography fontWeight="bold" align="inherit">
                <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
                <IconButton color={"inherit"} onClick={removeTodolist}><DeleteOutlineIcon/></IconButton>
            </Typography>
            <AddItemForm maxLenghtUserMessage={15} addNewItem={addTask}/>
            <TasksList
                tasks={props.tasks}
                todolistId={props.todolistId}
                removeTask={props.removeTask}
                changeTaskTitle={props.changeTaskTitle}
                changeTaskStatus={props.changeTaskStatus}/>
            <ButtonGroup
                size="small"
                fullWidth
                variant="contained"
                disableElevation>
                <Button
                    sx={{mr: "2px"}}
                    color={props.filter === "all" ? "secondary" : "primary"}
                    onClick={handlerCreator("all")}>All</Button>
                <Button
                    sx={{mr: "2px"}}
                    color={props.filter === "active" ? "secondary" : "primary"}
                    onClick={handlerCreator("active")}>Active</Button>
                <Button
                    sx={{mr: "2px"}}
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    onClick={handlerCreator("completed")}>Completed</Button>
            </ButtonGroup>

        </div>
    );
};

