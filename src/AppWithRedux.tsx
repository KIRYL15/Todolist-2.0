import './App.css';
import React from 'react';
import {Menu} from "@mui/icons-material";
import {AddItemForm} from "./AddItemForm";
import {AppRootStateType} from "./reducers/store";
import {useDispatch, useSelector} from "react-redux";
import {TodolistWithRedux} from "./TodolistWithRedux";
import {AddTodolistAC} from "./reducers/todolists-reducer";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";

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
export type TasksStateType = {
    [todolistId: string]: Array<TasksType>
}
//использование хука useReducer
export const AppWithRedux = (): JSX.Element => {
    let todolists = useSelector<AppRootStateType, Array<TodolistType>>((state) => state.todolists)
    const dispatch=useDispatch()
    const addTodolist = (title: string) => {
        let action = AddTodolistAC(title)
        dispatch(action)
    }    //добавление тудулистов
    const todolistsComponents = todolists
        .map(m => {
            return (
                <Grid item>
                    <Paper key={m.id} elevation={3}>
                        <TodolistWithRedux
                            //данные
                            title={m.title}
                            id={m.id}
                            filter={m.filter}/>
                    </Paper>
                </Grid>)
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
                    <AddItemForm
                        maxLenghtUserMessage={15}
                        addNewItem={addTodolist}/>
                </Grid>
                <Grid container spacing={4}>
                    {todolistsComponents}
                </Grid>
            </Container>
        </div>
    );
}