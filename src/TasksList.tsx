import React, {ChangeEvent, FC} from 'react';
import {TasksType} from "./App";
import s from "./Tasks.module.css"

type TasksListType = {
    todolistId: string,
    removeTask: (taskId: string, todolistId: string) => void,
    tasks: Array<TasksType>,
    changeTaskStatus: (tId: string, newIsDone: boolean, todolistId: string) => void
}
export const TasksList: FC<TasksListType> = (props): JSX.Element => {
    const taskItems: JSX.Element[] | JSX.Element = props.tasks.length
        ? props.tasks.map((m) => {
            const removeTaskHandler = () => {
                return (props.removeTask(m.id, props.todolistId))
            }
            const changeTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(m.id, e.currentTarget.checked, props.todolistId)
            }
            return (
                <li key={m.id}>
                    <input
                        type="checkbox"
                        checked={m.isDone}
                        onChange={changeTaskHandler}
                    />
                    <span className={m.isDone ? s.TaskDone : s.Task}>{m.title}</span>
                    <button onClick={removeTaskHandler}>X</button>
                </li>
            )
        })
        : <span>Your taskslist is empty</span>
    return (
        <ul>
            {taskItems}
        </ul>
    );
};

