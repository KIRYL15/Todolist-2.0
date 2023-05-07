import './App.css';
import {Todolist} from "./Todolist";
import React, {useCallback} from 'react';
import {Menu} from "@mui/icons-material";
import {AddItemForm} from "./AddItemForm";
import {AppRootStateType} from "./reducers/store";
import {useDispatch, useSelector} from "react-redux";
import {AddTodolistAC} from "./reducers/todolists-reducer";
import {TasksType, TodolistType} from "./api/todolists-api";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";

export type TasksStateType = {[key: string]: TasksType[]}

export function App(): JSX.Element {
    //BLL
    const todolist = useSelector<AppRootStateType, Array<TodolistType>>((state => state.todolists))
    const dispatch = useDispatch()
    const addTodolist = useCallback( (title: string) => {dispatch(AddTodolistAC(title))}, [dispatch])
    const todolistsComponents = todolist.map(m => {
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