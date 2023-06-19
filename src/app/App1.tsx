import './App.css';
import {Menu} from "@mui/icons-material";
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "./store";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import LinearProgress from "@mui/material/LinearProgress";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {initializeAppTC, logOutTC} from "../features/Login/auth-reducer";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {CircularProgress} from "@mui/material";

export function App1(): JSX.Element {
    //BLL
    const status = useAppSelector(state => state.app.status)
    const isInitialized = useAppSelector<boolean>(state => state.auth.isInitialized)
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

    //использовали кастомный хук useAppDispatch
    const dispatch = useAppDispatch()
    const logOut = () => {
        dispatch(logOutTC())
    }

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

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
                    {isLoggedIn && <Button onClick={logOut} color={"inherit"}>LOGOUT</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress color="secondary"/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={'/todolist-2.0'} element={<TodolistsList/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path="*" element={<Navigate to={'/404'}/>}/>
                </Routes>
            </Container>
        </div>
    );
}