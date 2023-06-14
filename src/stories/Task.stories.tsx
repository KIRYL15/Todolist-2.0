import React, {ChangeEvent} from "react";
import {Task} from "../Task";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../app/store";
import type {Meta, StoryObj} from '@storybook/react';
//import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import {changeTaskStatusAC, changeTaskTitleAC, removeTasksAC} from "../features/TodolistsList/tasks-reducer";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../components/EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {action} from "@storybook/addon-actions";
import {TaskStatuses, TaskType, UpdateTaskModelType} from "../api/todolists-api";

//дефолтное значение компонента
let meta: Meta<typeof Task> = {
    title: 'TODOLIST/Task',
    component: Task,
    //decorators: [ReduxStoreProviderDecorator]
};
type TaskReduxTypeProps = {
    callback: () => void
}
const TaskRedux = ({callback}: TaskReduxTypeProps) => {
    const todolistId = "todolistId1"
    let dispatch = useDispatch()
    let task = useSelector<AppRootStateType, TaskType>(state => state.tasks[todolistId][0])

    const onClickHandler = () => {
        dispatch(removeTasksAC(task.id, todolistId))
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        //dispatch(changeTaskStatusAC(task.id, newIsDoneValue, todolistId))
    }

    const onTitleChangeHandler = (model: UpdateTaskModelType) => {
        dispatch(changeTaskTitleAC(task.id, model, todolistId))
    }

    return (
        <div className={task.status ? "is-done" : ""}>
            <Checkbox
                checked={task.status===TaskStatuses.Completed}
                color="primary"
                onChange={onChangeHandler}/>
            {/*<EditableSpan value={task.title} onChange={onTitleChangeHandler}/>*/}
            <IconButton onClick={callback}>
                <Delete/>
            </IconButton>
        </div>
    )
}
export default meta;
type Story = StoryObj<typeof TaskRedux>;

export const TaskIsDoneStory: Story = {
    args: {
        callback: action('dsdd'),
    }
};

export const TaskNotIsDoneStory: Story = {
    args: {

    }
};
