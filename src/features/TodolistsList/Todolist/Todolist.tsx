import {Task} from "../../../Task";
import {useSelector} from "react-redux";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {Delete} from "@mui/icons-material";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import {addTaskTC, getTasksTC} from "../tasks-reducer";
import {AppRootStateType, useAppDispatch} from "../../../app/store";
import React, {memo, useCallback, useEffect, useMemo} from 'react';
import {
    ChangeTodolistFilterAC,
    changeTodolistTitleTC, deleteTodolistTC,
    TodolistDomainType
} from "../todolists-reducer";
type PropsType = {
    todolist: TodolistDomainType
}
export const Todolist = React.memo(({todolist}: PropsType) => {
    const {id, title, filter, entityStatus} = todolist
    let tasks = useSelector<AppRootStateType, Array<TaskType>>((state => state.tasks[id]))
    const dispatch = useAppDispatch()
    useEffect(()=>{
        dispatch(getTasksTC(id))
    },[])
    const addTask = useCallback((title: string) => dispatch(addTaskTC(id, title)), [dispatch])
    const removeTodolist = useCallback(() =>
        dispatch(deleteTodolistTC(id)), [dispatch])
    const changeTodolistTitle = useCallback((title: string) =>
        dispatch(changeTodolistTitleTC(id, title)), [dispatch])
    const onAllClickHandler = useCallback(() =>
        dispatch(ChangeTodolistFilterAC(id, "all")), [dispatch])
    const onActiveClickHandler = useCallback(() =>
        dispatch(ChangeTodolistFilterAC(id, "active")), [dispatch])
    const onCompletedClickHandler = useCallback(() =>
        dispatch(ChangeTodolistFilterAC(id, "completed")), [dispatch])
    useMemo(() => {
        if (filter === "active") {
            tasks = tasks.filter(t => t.status===TaskStatuses.New);
        }
        if (filter === "completed") {
            tasks = tasks.filter(t => t.status===TaskStatuses.Completed);
        }
        return tasks
    }, [filter])
    return <div>
        <h3>
            <EditableSpan value={title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist} disabled={entityStatus==='loading'}><Delete/></IconButton>
        </h3>
        <AddItemForm disabled={entityStatus==='loading'} addItem={addTask}/>
        <div>
            {tasks.map(t => {
                return (
                        <Task
                            key={t.id}
                            taskTitle={t.title}
                            taskId={t.id}
                            todolistId={id}
                            status={t.status}
                        />
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


