import {useDispatch} from "react-redux";
import {Delete} from "@mui/icons-material";
import {EditableSpan} from "./EditableSpan";
import {TasksType} from "./api/todolists-api";
import {Checkbox, IconButton} from "@mui/material";
import React, {ChangeEvent, memo, useCallback} from 'react';
import {changeTaskStatusAC, changeTaskTitleAC, removeTasksAC} from "./reducers/tasks-reducer";

export type TaskPropsType = {
    task: TasksType
    todolistId: string
}
export const Task: React.FC<TaskPropsType> = memo((props) => {

    let dispatch = useDispatch()

    const onClickHandler = useCallback(() => {
            dispatch(removeTasksAC(props.task.id, props.todolistId))
        },
        [dispatch, props.task.id, props.todolistId])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked
            dispatch(changeTaskStatusAC(props.task.id, newIsDoneValue, props.todolistId))
        },
        [dispatch, props.task.id, props.todolistId])

    const onTitleChangeHandler = useCallback((newValue: string) => {
            dispatch(changeTaskTitleAC(props.task.id, newValue, props.todolistId))
        },
        [dispatch, props.task.id, props.todolistId])

    return (
        <div className={props.task.isDone ? "is-done" : ""}>
            <Checkbox
                checked={props.task.isDone}
                color="primary"
                onChange={onChangeHandler}/>
            <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
});

