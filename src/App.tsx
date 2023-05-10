import './App.css';
import {Todolist} from "./Todolist";
import {useSelector} from "react-redux";
import {Menu} from "@mui/icons-material";
import {AddItemForm} from "./AddItemForm";
import {TaskType} from "./api/todolists-api";
import React, {useCallback, useEffect} from 'react';
import {AppRootStateType, useAppDispatch} from "./reducers/store";
import {AddTodolistAC, getTodolistsTC, TodolistDomainType} from "./reducers/todolists-reducer";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";

export type TasksStateType = { [key: string]: TaskType[] }

export function App(): JSX.Element {
    //BLL
    const todolist = useSelector<AppRootStateType, Array<TodolistDomainType>>((state => state.todolists))
    //const dispatch = useDispatch()
    //использовали кастомный хук useAppDispatch
    const dispatch = useAppDispatch()

    useEffect(() => {
                dispatch(getTodolistsTC())
    }, [])
    const addTodolist = useCallback((title: string) => {
        dispatch(AddTodolistAC(title))
    }, [dispatch])
    const todolistsComponents = todolist.map((m) => {
        //const tasksForRender: Array<TasksType> = getFilteredTasks(tasks[m.id], m.filter)
        return (

            <Grid key={m.id} item>

                <Paper elevation={3}>
                    <Todolist todolist={m}/>
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
                        sx={{mr: 2}}>
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
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={4}>
                    {todolistsComponents}
                </Grid>
            </Container>
        </div>
    );
}