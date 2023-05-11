import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";

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

export const todolistsReducer = (state = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {return state.filter(f => f.id !== action.id)}
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]
        }
        case "CHANGE-TODOLIST-TITLE":
            return state.map(m => m.id === action.id ? {...m, title: action.title} : m)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(m => m.id === action.id ? {...m, filter: action.filter} : m)
        case "SET-TODOLISTS":
            return action.todolists.map((el) => ({...el, filter: "all"}))
        default:
            return state
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
export const SetTodolistsAC = (todolists: Array<TodolistType>) => {
    return {
        type: "SET-TODOLISTS",
        todolists
    } as const
}

export const getTodolistsTC = () => (dispatch: Dispatch) => {
    todolistsAPI.getTodolists()
        .then((response) => {
            dispatch(SetTodolistsAC(response.data))
        })
}
export const createTodolistTC = (title:string) => (dispatch: Dispatch) => {
    todolistsAPI.createTodolist(title)
        .then((response) => {
            dispatch(AddTodolistAC(response.data.data.item.title))
        })
}

export const deleteTodolistTC = (todoId:string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTodolist(todoId)
        .then((response) => {
            dispatch(RemoveTodolistAC(todoId))
        })
}

export const changeTodolistTitleTC = (todoId:string, title:string) => (dispatch: Dispatch) => {
    todolistsAPI.updateTodolistTitle(todoId, title)
        .then((response) => {
            dispatch(ChangeTodolistTitleAC(todoId, title))
        })
}