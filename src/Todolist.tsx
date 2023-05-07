import {Task} from "./Task";
import {AddItemForm} from "./AddItemForm";
import {Delete} from "@mui/icons-material";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {addTasksAC} from "./reducers/tasks-reducer";
import React, {memo, useCallback, useMemo} from 'react';
import {AppRootStateType, store} from "./reducers/store";
import {TasksType, TodolistType} from "./api/todolists-api";
import {Provider, useDispatch, useSelector} from "react-redux";
import {ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC} from "./reducers/todolists-reducer";

type PropsType = {
    todolist: TodolistType
}

export const Todolist = React.memo(({todolist}: PropsType) => {
    const {id, title, filter} = todolist
    let tasks = useSelector<AppRootStateType, Array<TasksType>>((state => state.tasks[id]))
    let dispatch = useDispatch()

    const addTask = useCallback((title: string) => dispatch(addTasksAC(title, id)), [dispatch])
    const removeTodolist = useCallback(() =>
        dispatch(RemoveTodolistAC(id)), [dispatch])
    const changeTodolistTitle = useCallback((title: string) =>
        dispatch(ChangeTodolistTitleAC(id, title)), [dispatch])

    const onAllClickHandler = useCallback(() =>
        dispatch(ChangeTodolistFilterAC(id, "all")), [dispatch])
    const onActiveClickHandler = useCallback(() =>
        dispatch(ChangeTodolistFilterAC(id, "active")), [dispatch])
    const onCompletedClickHandler = useCallback(() =>
        dispatch(ChangeTodolistFilterAC(id, "completed")), [dispatch])

    useMemo(() => {
        if (filter === "active") {
            tasks = tasks.filter(t => !t.isDone);
        }
        if (filter === "completed") {
            tasks = tasks.filter(t => t.isDone);
        }
        return tasks
    }, [filter])

    return <div>
        <h3>
            <EditableSpan value={title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}><Delete/></IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {tasks.map(t => {
                return (
                    <Provider store={store}>
                        <Task
                        key={t.id}
                        task={t}
                        todolistId={id}/>
                    </Provider>
                )
            })}
        </div>
        <div style={{paddingTop: "10px"}}>
            <ButtonWithMemo
                title={"All"}
                color={'warning'}
                variant={filter === 'all' ? 'outlined' : 'text'}
                onClick={onAllClickHandler}/>
            <ButtonWithMemo
                title={"Active"}
                color={'primary'}
                variant={filter === 'active' ? 'outlined' : 'text'}
                onClick={onActiveClickHandler}/>
            <ButtonWithMemo
                title={"Completed"}
                color={'secondary'}
                variant={filter === 'completed' ? 'outlined' : 'text'}
                onClick={onCompletedClickHandler}/>
            {/*<Button variant={filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'warning'}>All</Button>*/}

        </div>
    </div>
})
type ButtonWithMemoPropsType = {
    title: string
    color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
    variant: 'text' | 'outlined' | 'contained'
    onClick: () => void
}
let ButtonWithMemo = memo((props: ButtonWithMemoPropsType) => {
    return <Button variant={props.variant}
                   onClick={props.onClick}
                   color={props.color}>{props.title}</Button>
})


