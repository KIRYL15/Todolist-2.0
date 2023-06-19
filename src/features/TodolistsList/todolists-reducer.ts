import {ResultCode, todolistsAPI, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {
    RequestStatusType,
    setErrorAC,
    SetErrorACType,
    setLoadingStatusAC,
    SetStatusACType
} from "../../app/app-reducer";
import {handleServerAppError} from "../../utils/error-utils";

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
export type ChangeTodolistsEntityStatusACType = ReturnType<typeof ChangeTodolistsEntityStatusAC>
export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
    entityStatus: RequestStatusType
}
export type FilterValueType = "all" | "active" | "completed"

export type ActionType =
    RemoveTodolisAT
    | AddTodolistAT
    | ChangeTodolistTitleAT
    | ChangeTodolistFilterAT
    | SetTodolistsTypeAT
    | SetStatusACType
    | ChangeTodolistsEntityStatusACType
    | SetErrorACType
let initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(f => f.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        }
        case "CHANGE-TODOLIST-TITLE":
            return state.map(m => m.id === action.id ? {...m, title: action.title} : m)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(m => m.id === action.id ? {...m, filter: action.filter} : m)
        case "SET-TODOLISTS":
            return action.todolists.map((el) => ({...el, filter: "all", entityStatus: 'idle'}))
        case "SET-ENTITY-STATUS":
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
        default:
            return state
    }
}
export const RemoveTodolistAC = (id: string): RemoveTodolisAT => ({type: "REMOVE-TODOLIST", id})
export const AddTodolistAC = (todolist: TodolistType) => {
    return {
        type: "ADD-TODOLIST",
        todolist
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
export const ChangeTodolistsEntityStatusAC = (id: string, status: RequestStatusType) => {
    return {
        type: "SET-ENTITY-STATUS",
        id,
        status
    } as const
}

//thunk
export const getTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(setLoadingStatusAC('loading'))
    todolistsAPI.getTodolists()
        .then((response) => {
            dispatch(SetTodolistsAC(response.data))
            dispatch(setLoadingStatusAC('succeeded'))
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    debugger
    dispatch(setLoadingStatusAC('loading'))
    todolistsAPI.createTodolist(title)
        .then((response) => {
            if (response.data.resultCode === ResultCode.OK) {
                dispatch(AddTodolistAC(response.data.data.item))
                dispatch(setLoadingStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, response.data)
            }

        })
}

export const deleteTodolistTC = (todoId: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingStatusAC('loading'))
    dispatch(ChangeTodolistsEntityStatusAC(todoId, 'loading'))
    todolistsAPI.deleteTodolist(todoId)
        .then((response) => {
            if (response.data.resultCode === ResultCode.OK) {
                dispatch(RemoveTodolistAC(todoId))
                dispatch(setLoadingStatusAC('succeeded'))
            } else {
                if (response.data.messages.length) {
                    dispatch(setErrorAC(response.data.messages[0]))
                } else {
                    dispatch(setErrorAC('Some error'))
                }
                dispatch(setLoadingStatusAC('failed'))
                dispatch(ChangeTodolistsEntityStatusAC(todoId, 'failed'))
            }
        })
        .catch((e) => {
            dispatch(ChangeTodolistsEntityStatusAC(todoId, 'failed'))
            dispatch(setLoadingStatusAC('failed'))
            dispatch(setErrorAC(e.message))
        })
}

export const changeTodolistTitleTC = (todoId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingStatusAC('loading'))

    todolistsAPI.updateTodolistTitle(todoId, title)
        .then((response) => {
            dispatch(ChangeTodolistTitleAC(todoId, title))
            dispatch(setLoadingStatusAC('succeeded'))

        })
}