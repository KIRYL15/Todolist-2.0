import React, {ChangeEvent, FC} from 'react';
import {TasksType} from "./App";
import s from "./Tasks.module.css"

type TasksListType = {
    removeTask: (taskId: string) => void,
    tasks: Array<TasksType>,
    changeTaskStatus: (tId: string, newIsDone: boolean) => void
}
export const TasksList: FC<TasksListType> = (props): JSX.Element => {
    return (
        <div>
            {props.tasks.map((m) => {
                const removeTaskHandler = () => props.removeTask(m.id)
                const changeTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    debugger
                    props.changeTaskStatus(m.id, e.currentTarget.checked)
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
            })}
        </div>
    );
};

