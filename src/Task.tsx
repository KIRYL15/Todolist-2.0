import {Delete} from "@mui/icons-material";
import {EditableSpan} from "./EditableSpan";
import {TaskStatuses, TaskType} from "./api/todolists-api";
import {Checkbox, IconButton} from "@mui/material";
import React, {ChangeEvent, memo, useCallback} from 'react';
import {changeTaskStatusTC, changeTaskTitleAC, deleteTaskTC} from "./reducers/tasks-reducer";
import {useAppDispatch} from "./reducers/store";

export type TaskPropsType = {
    task: TaskType
    todolistId: string
    status:any
}
export const Task: React.FC<TaskPropsType> = memo((props) => {

    let dispatch = useAppDispatch()

    const removeTask = useCallback(() => {
            dispatch(deleteTaskTC(props.todolistId, props.task.id))
        },
        [])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked
            dispatch(changeTaskStatusTC(props.todolistId, props.task.id, newIsDoneValue? TaskStatuses.Completed:TaskStatuses.New))
        },
        [dispatch, props.task.id, props.todolistId])

    const onTitleChangeHandler = useCallback((newValue: string) => {
            dispatch(changeTaskTitleAC(props.task.id, newValue, props.todolistId))
        },
        [dispatch, props.task.id, props.todolistId])
   // console.log("props", props.task.status)
    return (

        <div className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>
            <Checkbox
                checked={props.task.status === TaskStatuses.Completed}
                color="primary"
                onChange={onChangeHandler}/>
            <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </div>
    )
});

