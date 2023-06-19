import axios, {AxiosResponse} from "axios";
import {LoginType} from "../features/Login/Login";

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    headers: {"API-KEY": "04feb261-a80c-4052-8671-12911595a77d"}
})

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum ResultCode {
    OK = 0,
    ERROR = 1
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type GetTaskResponse = {
    items: Array<TaskType>
    totalCount: string
    error: string | null
}
//api
export const todolistsAPI = {
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>(`/todo-lists`, {title: title})
    },
    getTodolists() {
        return instance.get<Array<TodolistType>>(`/todo-lists`)
    },
    deleteTodolist(todoListId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todoListId}`)
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}`, {title: title})
    }
}
export const tasksAPI = {
    createTask(todolistId: string, title: string) {
        debugger
        return instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, {title: title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTaskResponse>(`/todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        debugger
        return instance.put<ResponseType<{ item: TaskType }>, AxiosResponse<ResponseType<{ item: TaskType }>>, UpdateTaskModelType>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    }
}
export const authAPI = {

    login(data: LoginType) {

        return instance.post<ResponseType<{ userId: number }>, AxiosResponse<ResponseType<{ userId: number }>>, LoginType>(`/auth/login`, data)
    },
    logOut() {
        return instance.delete<ResponseType>(`/auth/login`)
    },
    me() {
        return instance.get<ResponseType<{id:number, email:string, login:string}>>(`/auth/me`)
    }
}
