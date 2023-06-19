import React, {useEffect} from 'react';
import Grid from "@mui/material/Grid";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {Navigate} from "react-router-dom";
import {getTodolistsTC} from "./todolists-reducer";

type TodoListTypeProps={
    addTodolist:(title: string)=>void
    todolistsComponents:any
}
export const TodoList = (props:TodoListTypeProps) => {
    const isLoginIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isLoginIn) {
            dispatch(getTodolistsTC())
        }
    }, [])

    if (isLoginIn) {
        return <Navigate to={'/login'}/>
    }
    return (
        <div>
            <Grid container
                  sx={{p: "10px 0px"}}>
                <AddItemForm addItem={props.addTodolist}/>
            </Grid>
            <Grid container spacing={4}>
                {props.todolistsComponents}
            </Grid>
        </div>
    );
};

