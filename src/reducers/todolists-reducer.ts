import {FilterValueType, TodolistType} from "../AppWithRedux";
import {v1} from "uuid";

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
export type ChangeTodolistFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValueType
}
export type ActionType = RemoveTodolisAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT
let initialState:Array<TodolistType>=[]
export const todolistsReducer = (todolists=initialState, action: ActionType): Array<TodolistType> => {

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
        default:
            return todolists
    }
}
export const RemoveTodolistAC = (id: string): RemoveTodolisAT => ({type: "REMOVE-TODOLIST", id})
export const AddTodolistAC = (title: string) => {
    return {
        type: "ADD-TODOLIST",
        title,
        todolistId:v1()
    } as const
}
export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleAT => ({
    type: "CHANGE-TODOLIST-TITLE",
    id,
    title
})
export const ChangeTodolistFilterAC = (id: string, filter: FilterValueType): ChangeTodolistFilterAT => ({
    type: "CHANGE-TODOLIST-FILTER",
    id,
    filter
})

