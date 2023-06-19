import './App.css';
import {Todolist} from "../features/TodolistsList/Todolist/Todolist";
import {useSelector} from "react-redux";
import {Menu} from "@mui/icons-material";
import {TaskType} from "../api/todolists-api";
import React, {useCallback, useEffect} from 'react';
import {AppRootStateType, useAppDispatch, useAppSelector} from "./store";
import {addTodolistTC, getTodolistsTC, TodolistDomainType} from "../features/TodolistsList/todolists-reducer";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import LinearProgress from "@mui/material/LinearProgress";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {TodoList} from "../features/TodolistsList/TodoList";
import {initializeAppTC} from "../features/Login/auth-reducer";


export type TasksStateType = { [key: string]: TaskType[] }

export function App(): JSX.Element {
    //BLL
    const todolist = useSelector<AppRootStateType, Array<TodolistDomainType>>((state => state.todolists))
    const status = useAppSelector(state => state.app.status)
    const isLoginIn = useAppSelector(state => state.auth.isLoggedIn)

    //const dispatch = useDispatch()
    //использовали кастомный хук useAppDispatch
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (isLoginIn) {
            dispatch(getTodolistsTC())
        }
    }, [])
    useEffect(() => {
        debugger
        dispatch(initializeAppTC())
    }, [])


    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
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
            <ErrorSnackbar/>

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
                {status === 'loading' && <LinearProgress color="secondary"/>}
            </AppBar>

            <Container fixed>
                <Routes>
         {/*           <Route path={'/todolist-2.0'}
                           element={<TodoList todolistsComponents={todolistsComponents} addTodolist={addTodolist}/>}/>
                    <Route path={'/login'} element={<Login/>}/>

                    <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path="*" element={<Navigate to={'/404'}/>}/>*/}
                </Routes>
                {/*  <Grid container
                      sx={{p: "10px 0px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={4}>
                    {todolistsComponents}
                </Grid>*/}

            </Container>
        </div>
    );
}