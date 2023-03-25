import './App.css';
import {v1} from "uuid";
import {Todolist} from "./Todolist";
import React, {useState} from 'react';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}
export type FilterValueType = "all" | "active" | "completed"
export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValueType,
}
type TasksStateType = {
    [todolistId: string]: Array<TasksType>
}
export type TodolistsStateType = Array<TodolistType>
export const App = (): JSX.Element => {
    //BLL
    //список тудулистов
    const todolistId_1 = v1()
    const todolistId_2 = v1()

    const [todolists, setTodolists] = useState<TodolistsStateType>([
        {id: todolistId_1, title: "What to learn", filter: "all"},
        {id: todolistId_2, title: "What to buy", filter: "all"},
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "REDUX", isDone: false},
        ],
        [todolistId_2]: [
            {id: v1(), title: "MILK", isDone: true},
            {id: v1(), title: "MEAT", isDone: false},
            {id: v1(), title: "BREAD", isDone: true},
        ]
    })
    //BLL
    const removeTask = (taskId: string, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)
        })
    }
    const addTask = (title: string, todolistId: string) => {
        const newTask: TasksType = {
            id: v1(),
            title: title,
            isDone: false
        }

        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
    const changeTaskStatus = (tId: string, newIsDone: boolean, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId]
                .map(m => m.id === tId ? {...m, isDone: newIsDone} : m)
        })
    }
    const changeTaskTitle = (tId: string, newTitle: string, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId]
                .map(m => m.id === tId ? {...m, title: newTitle} : m)
        })
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(f => f.id !== todolistId))
        const copyTasks = {...tasks}
        delete copyTasks[todolistId]
        setTasks(copyTasks)
    }
    const addTodolist = (title: string) => {
        const newTodolistId = v1()
        const newTodolist: TodolistType = {
            id: newTodolistId,
            title: title,
            filter: 'all'
        }
        setTodolists([newTodolist, ...todolists])
        //обязательное добавление пустой таски
        setTasks({[newTodolistId]: [], ...tasks})
    }    //добавление тудулистов
    const changeTodolistTitle = (newTitle: string, todolistId: string) => {
        setTodolists(todolists.map(m => m.id === todolistId ? {...m, title: newTitle} : m))
    }
    const changeTodolistFilter = (filter: FilterValueType, todolistId: string) => {
        setTodolists(todolists.map(m => m.id === todolistId ? {...m, filter: filter} : m))
    }

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
    const todolistsComponents = todolists
        .map(m => {
            const tasksForRender: Array<TasksType> = getFilteredTasks(tasks[m.id], m.filter)
            return (
                <Grid item>
                <Paper elevation={3}>
                    <Todolist
                        //данные
                        key={m.id}
                        title={m.title}
                        todolistId={m.id}
                        filter={m.filter}
                        tasks={tasksForRender}
                        //функции для тасок
                        addTask={addTask}
                        removeTask={removeTask}
                        changeTaskTitle={changeTaskTitle}
                        changeTaskStatus={changeTaskStatus}
                        //функции для тудулистов
                        removeTodolist={removeTodolist}
                        changeTodolistTitle={changeTodolistTitle}
                        changeTodolistFilter={changeTodolistFilter}
                    />
                </Paper>
                </Grid>
            )
        })
//UI
    return (
        <div className={"App"}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size={"small"}
                        edge={"start"}
                        color={"inherit"}
                        aria-label={"menu"}
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h5"}
                                component={"div"}
                                sx={{flexGrow: 1}}>TODOLIST</Typography>
                    <Button color={"inherit"}>LOGIN</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container
                      sx={{p: "10px 0px"}}>
                    <AddItemForm
                        maxLenghtUserMessage={15}
                        addNewItem={addTodolist}
                    />
                </Grid>
                <Grid container spacing={4}>
                    {todolistsComponents}
                </Grid>
            </Container>
        </div>
    );
}