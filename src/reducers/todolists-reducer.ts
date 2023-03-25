import {FilterValueType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolisAT = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodolistAT = {
    type: "ADD-TODOLIST"
    title: string
}
export type ChangeTodolistTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}
export type ChangeTodolistFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValueType
}
export type ActionType = RemoveTodolisAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT

export const todolistsReducer = (todolists: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(f => f.id !== action.id)
        case "ADD-TODOLIST":
            const newTodolistId = v1()
            const newTodolist: TodolistType = {
                id: newTodolistId,
                title: action.title,
                filter: 'all'
            }
            return [newTodolist, ...todolists]
        case "CHANGE-TODOLIST-TITLE":
            return todolists.map(m => m.id === action.id ? {...m, title: action.title} : m)
        case "CHANGE-TODOLIST-FILTER":
            return todolists.map(m => m.id === action.id ? {...m, filter: action.filter} : m)
        default:
            return todolists
    }
}
