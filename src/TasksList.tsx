import React, {FC} from 'react';
import {TasksType} from "./App";

type TasksListType = {
    removeTask: (taskId: string) => void,
    tasks:Array<TasksType>
}
export const TasksList: FC<TasksListType> = (props):JSX.Element => {
    return (
        <div>
            {props.tasks.map((m)=>{
                const onClickHandler=()=>props.removeTask(m.id)
                return(
                    <li key={m.id}>
                        <input type="checkbox" checked={m.isDone}/>
                        <span>{m.title}</span>
                        <button onClick={onClickHandler}>X</button>
                    </li>
                )
            })}
        </div>
    );
};

