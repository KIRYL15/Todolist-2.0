import React, {ChangeEvent} from 'react';
import {Delete} from "@mui/icons-material";
import {AppRootStateType} from "./reducers/store";
import {useDispatch, useSelector} from "react-redux";
import {FilterValueType, TasksType} from "./AppWithRedux";
import {Button, Checkbox, IconButton} from "@mui/material";
import {AddItemFormWithRedux} from './AddItemFormWithRedux';
import {EditableSpanWithRedux} from './EditableSpanWithRedux';
import {addTasksAC, changeTaskStatusAC, changeTaskTitleAC, removeTasksAC} from "./reducers/tasks-reducer";
import {ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC} from "./reducers/todolists-reducer";

type PropsType = {
    id: string
    title: string
    filter: FilterValueType
}

export function TodolistWithRedux(props: PropsType) {
    let tasks = useSelector<AppRootStateType, Array<TasksType>>(state => state.tasks[props.id])
    const dispatch = useDispatch()
    const addTask = (title: string) => dispatch(addTasksAC(title, props.id))
    const removeTodolist = () => dispatch(RemoveTodolistAC(props.id))
    const changeTodolistTitle = (title: string) => dispatch(ChangeTodolistTitleAC(props.id, title))
    const onAllClickHandler = () => dispatch(ChangeTodolistFilterAC(props.id, "all"))
    const onActiveClickHandler = () => dispatch(ChangeTodolistFilterAC(props.id, "active"))
    const onCompletedClickHandler = () => dispatch(ChangeTodolistFilterAC(props.id, "completed"))

    if (props.filter === "active") {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasks = tasks.filter(t => t.isDone);
    }
    return <div>
        <h3>
            <EditableSpanWithRedux value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}><Delete/></IconButton>
        </h3>
        <AddItemFormWithRedux addItem={addTask}/>
        <div>
            {
                tasks.map(t => {
                    const onClickHandler = () => dispatch(removeTasksAC(t.id, props.id))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(t.id, newIsDoneValue, props.id))
                    }
                    const onTitleChangeHandler = (newValue: string) => dispatch(changeTaskTitleAC(t.id, newValue, props.id))

                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                            checked={t.isDone}
                            color="primary"
                            onChange={onChangeHandler}/>
                        <EditableSpanWithRedux value={t.title} onChange={onTitleChangeHandler}/>
                        <IconButton onClick={onClickHandler}><Delete/></IconButton>
                    </div>
                })
            }
        </div>
        <div><Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'warning'}>All</Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active</Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed</Button></div>
    </div>
}


