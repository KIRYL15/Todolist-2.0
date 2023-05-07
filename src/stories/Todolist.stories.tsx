import React, {ChangeEvent, useEffect, useState} from 'react'
import {tasksAPI, todolistsAPI} from "../api/todolists-api";

export default {title: 'API'}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((response) => {
                setState(response.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {

    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.createTodolist("BLA-BLA")
            .then((response) => {
                setState(response.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId="3a8ee05f-996c-4604-bb2f-65231b5e56f1"
        todolistsAPI.deleteTodolist(todolistId)
            .then((response) => {
                setState(response.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = "/3a8ee05f-996c-4604-bb2f-65231b5e56f1"
        todolistsAPI.updateTodolistTitle(todolistId, 'updateTODOLISTTITLE')
            .then((response) => {
                setState(response.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '3a8ee05f-996c-4604-bb2f-65231b5e56f1'
        tasksAPI.getTasks(todolistId)
            .then((response) => {
                setState(response.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>("")
    const [todolistId, setTodolistId] = useState<string>("")
    const onChangeTask = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }
    const onChangeTodolist = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const deleteTask = () => {
        //const todolistId = '3a8ee05f-996c-4604-bb2f-65231b5e56f1'
        //const taskId = '6f984821-27d6-4761-b8f4-e44e93ec0e4c'
        tasksAPI.deleteTask(todolistId, taskId)
            .then((response) => {
                setState(response.data)
            })
    }

/*useEffect(() => {
    const todolistId = '3a8ee05f-996c-4604-bb2f-65231b5e56f1'
    const taskId = '067cfe4a-9fd1-4931-ac0f-1308262d037b'
    tasksAPI.deleteTask(todolistId, taskId)
        .then((response) => {
            setState(response.data)
        })
}, [])*/
return <div>
    {JSON.stringify(state)}
    <div>
        <button onClick={deleteTask}>Delete Task</button>
    </div>
    <div><input placeholder={"todolistId"} value={todolistId} onChange={onChangeTodolist}/></div>
    <div><input placeholder={"taskId"} value={taskId} onChange={onChangeTask}/></div>
</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'e2e144ee-6c91-47a0-8330-d8740c0901d9'
        const taskId = 'd85c9c6d-0dfb-4530-a46f-738f091b09dd'
        const title = "SUPER обновленная новая таска"
        tasksAPI.updateTask(todolistId, taskId, title)
            .then((response) => {
                setState(response.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '3a8ee05f-996c-4604-bb2f-65231b5e56f1'
        const title = "SUPER созданная новая таска-1"
        tasksAPI.createTask(todolistId, title)
            .then((response) => {
                setState(response.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
