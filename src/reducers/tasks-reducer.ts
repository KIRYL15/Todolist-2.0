import {v1} from "uuid";
import {TasksStateType} from "../App";
import {AddTodolistAT, RemoveTodolisAT} from "./todolists-reducer";
import {TasksType} from "../api/todolists-api";

export type RemoveTaskActionType = ReturnType<typeof removeTasksAC>
export type AddTaskActionType = ReturnType<typeof addTasksAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistAT
    | RemoveTodolisAT
let initialState: TasksStateType = {}
export const tasksReducer = (state= initialState, action: ActionType): TasksStateType => {

    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .filter(fl => fl.id !== action.taskId)
            }
        }
        case "ADD-TASK": {

            const newTask: TasksType = {
                id: v1(),
                title: action.title,
                isDone: false
            }

            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        }
        case "CHANGE-TASK-STATUS":
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(m => m.id === action.taskId
                        ? {...m, isDone: action.isDone}
                        : m)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(m => m.id === action.taskId ? {...m, title: action.title} : m)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todolistId]: []
            }
        case "REMOVE-TODOLIST":
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        default:
            return state
    }
}

export const removeTasksAC = (taskId: string, todolistId: string) => {
    return {
        type: "REMOVE-TASK",
        taskId,
        todolistId
    } as const
}
export const addTasksAC = (title: string, todolistId: string) => {

    return {
        type: "ADD-TASK",
        title,
        todolistId
    } as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {

    return {
        type: "CHANGE-TASK-STATUS",
        taskId,
        isDone,
        todolistId
    } as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        taskId,
        title,
        todolistId
    } as const
}

