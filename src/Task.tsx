import {Delete} from "@mui/icons-material";
import {EditableSpan} from "./EditableSpan";
import {useAppDispatch} from "./reducers/store";
import {TaskStatuses} from "./api/todolists-api";
import {Checkbox, IconButton} from "@mui/material";
import React, {ChangeEvent, memo, useCallback} from 'react';
import {changeTaskStatusTC, changeTaskTitleTC, deleteTaskTC} from "./reducers/tasks-reducer";

export type TaskPropsType = {
    taskTitle:string
    taskId: string
    todolistId: string
    status:any
}
export const Task: React.FC<TaskPropsType> = memo((props) => {

    let dispatch = useAppDispatch()

    const removeTask = useCallback(() => {
            dispatch(deleteTaskTC(props.todolistId, props.taskId))
        },
        [dispatch, props.todolistId, props.taskId])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked
            dispatch(changeTaskStatusTC(props.todolistId, props.taskId, newIsDoneValue? TaskStatuses.Completed:TaskStatuses.New))
        },
        [dispatch, props.taskId, props.todolistId])

    const onTitleChangeHandler = useCallback((newValue: string) => {
            dispatch(changeTaskTitleTC(props.todolistId, props.taskId,newValue))
        },
        [dispatch, props.taskId, props.todolistId])
    return (

        <div className={props.status === TaskStatuses.Completed ? "is-done" : ""}>
            <Checkbox
                checked={props.status === TaskStatuses.Completed}
                color="primary"
                onChange={onChangeHandler}/>
            <EditableSpan value={props.taskTitle} onChange={onTitleChangeHandler}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </div>
    )
});

