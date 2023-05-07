import {v1} from "uuid";
import {TodolistType, TodolistTypeAPI} from "../api/todolists-api";

export type RemoveTodolisAT = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodolistAT = ReturnType<typeof AddTodolistAC>
export type ChangeTodolistTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}
export type ChangeTodolistFilterAT = ReturnType<typeof ChangeTodolistFilterAC>
export type SetTodolistsTypeAT = ReturnType<typeof SetTodolistsAC>
export type TodolistDomainType = TodolistType & { filter: FilterValueType }
export type FilterValueType = "all" | "active" | "completed"

export type ActionType =
    RemoveTodolisAT
    | AddTodolistAT
    | ChangeTodolistTitleAT
    | ChangeTodolistFilterAT
    | SetTodolistsTypeAT
let initialState: Array<TodolistDomainType> = []
export const todolistsReducer = (todolists = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(f => f.id !== action.id)
        case "ADD-TODOLIST":
            const newTodolist: TodolistType = {
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            }
            return [newTodolist, ...todolists]
        case "CHANGE-TODOLIST-TITLE":
            return todolists.map(m => m.id === action.id ? {...m, title: action.title} : m)
        case "CHANGE-TODOLIST-FILTER":
            return todolists.map(m => m.id === action.id ? {...m, filter: action.filter} : m)
        case "SET-TODOLISTS":
            return action.todolists.map((el) => ({...el, filter: "all"}))
        default:
            return todolists
    }
}
export const RemoveTodolistAC = (id: string): RemoveTodolisAT => ({type: "REMOVE-TODOLIST", id})
export const AddTodolistAC = (title: string) => {
    return {
        type: "ADD-TODOLIST",
        title,
        todolistId: v1()
    } as const
}
export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleAT => ({
    type: "CHANGE-TODOLIST-TITLE",
    id,
    title
})
export const ChangeTodolistFilterAC = (id: string, filter: FilterValueType) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        id,
        filter
    } as const
}

export const SetTodolistsAC = (todolists: Array<TodolistTypeAPI>) => {
    return {
        type: "SET-TODOLISTS",
        todolists
    } as const
}

