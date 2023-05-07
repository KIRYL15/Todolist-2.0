import axios from "axios";
import {FilterValueType} from "../reducers/todolists-reducer";
export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}
export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValueType,
}
const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    headers: {"API-KEY": "04feb261-a80c-4052-8671-12911595a77d"}
})
export type TodolistTypeAPI = {
    id: string
    title: string
    addedDate: Date
    order: number
}
type ResponseType<D={}> = {
    resultCode: number
    messages: Array<string>
    data: D
}
type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type GetTaskResponse<D> = {
    items: Array<TaskType>
    totalCount: string
    error: string | null
}
export const todolistsAPI = {
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistTypeAPI }>>(`/todo-lists`, {title: title})
    },
    getTodolists() {
        return instance.get<Array<TodolistTypeAPI>>(`/todo-lists`)
    },
    deleteTodolist(todolistId:string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}`, {title: title})
    }
}
export const tasksAPI = {
    createTask(todolistId: string, title: string){
        return instance.post(`/todo-lists/${todolistId}/tasks`, {title:title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTaskResponse<{}>>(`/todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, title:string){
        return instance.put<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`, {title:title})
    },
}