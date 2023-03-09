import React, {FC} from 'react';
import {TasksType} from "./App";

type TasksListType = {
    removeTask: (taskId: string) => void,
    tasks:Array<TasksType>
}
export const TasksList: FC<TasksListType> = (props) => {

    return (
        <div>
            {props.tasks.map((m)=>{
                return(
                    <li key={m.id}>
                        <input type="checkbox" checked={m.isDone}/>
                        <span>{m.title}</span>
                        <button onClick={()=>{props.removeTask(m.id)}}>X</button>
                    </li>
                )
            })}
        </div>
    );
};

