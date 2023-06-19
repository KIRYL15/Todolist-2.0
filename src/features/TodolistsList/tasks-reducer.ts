import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";
import {AddTodolistAT, RemoveTodolisAT, SetTodolistsTypeAT} from "./todolists-reducer";
import {
    ResultCode,
    TaskPriorities,
    tasksAPI,
    TaskStatuses,
    TaskType,
    UpdateTaskModelType
} from "../../api/todolists-api";
import {setLoadingStatusAC, SetStatusACType} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import axios from "axios";

export type RemoveTaskActionType = ReturnType<typeof removeTasksAC>
export type AddTaskActionType = ReturnType<typeof addTasksAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type SetTasksAT = ReturnType<typeof setTasksAC>
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistAT
    | RemoveTodolisAT
    | SetTodolistsTypeAT
    | SetTasksAT
    | SetStatusACType
let initialState: TasksStateType = {}
export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .filter(fl => fl.id !== action.taskId)
            }
        }
        case "ADD-TASK": {
            /* const stateCopy = {...state}
             const newTask: TaskType = {
                 id: v1(),
                 title: action.title,
                 status: TaskStatuses.New,
                 todoListId: action.todolistId, description: '',
                 startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
             }
             const tasks = stateCopy[action.todolistId];
             const newTasks = [newTask, ...tasks];
             stateCopy[action.todolistId] = newTasks;*/
            return {
                ...state,
                [action.todoListId]: [action.task, ...state[action.todoListId]]
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(m => m.id === action.taskId
                        ? {...m, status: action.status}
                        : m)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(m => m.id === action.taskId
                        ? {...m, ...action.model}
                        : m)
            }
        }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }
        case "REMOVE-TODOLIST": {
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        case "SET-TODOLISTS": {
            const copyState = {...state}
            action.todolists.forEach((td) => {
                copyState[td.id] = []
            })
            return copyState
        }
        case "SET-TASKS": {
            return {
                ...state, [action.todoListId]: action.tasks
            }
        }
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
export const addTasksAC = (task: TaskType, todoListId: string) => {
    return {
        type: "ADD-TASK",
        task,
        todoListId
    } as const
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => {
    return {
        type: "CHANGE-TASK-STATUS",
        taskId,
        status,
        todolistId
    } as const
}
export const changeTaskTitleAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        taskId,
        model,
        todolistId
    } as const
}
export const setTasksAC = (todoListId: string, tasks: Array<TaskType>) => {
    return {
        type: "SET-TASKS",
        tasks,
        todoListId
    } as const
}

//ThunkCreator


export const addTaskTC = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingStatusAC('loading'))
    tasksAPI.createTask(todoListId, title)
        .then((response) => {
            if (response.data.resultCode === ResultCode.OK) {
                dispatch(addTasksAC(response.data.data.item, todoListId))
                dispatch(setLoadingStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, response.data)
            }
        })
        .catch((e) => {
            handleServerNetworkError(dispatch, e)
        })
}
export const getTasksTC = (todoListId: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingStatusAC('loading'))
    tasksAPI.getTasks(todoListId)
        .then((response) => {
            dispatch(setTasksAC(todoListId, response.data.items))
            dispatch(setLoadingStatusAC('succeeded'))
        })
}
export const deleteTaskTC = (todoListId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingStatusAC('loading'))
    tasksAPI.deleteTask(todoListId, taskId)
        .then((response) => {
            dispatch(removeTasksAC(taskId, todoListId))
            dispatch(setLoadingStatusAC('succeeded'))
        })
}
export const changeTaskStatusTC = (todoId: string, taskId: string, status: TaskStatuses) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(setLoadingStatusAC('loading'))
        const tasks = getState().tasks[todoId].find((t) => t.id === taskId)
        if (tasks) {
            const model: UpdateTaskModelType = {
                title: tasks.title,
                deadline: tasks.deadline,
                startDate: tasks.startDate,
                priority: tasks.priority,
                description: tasks.description,
                status
            }
            tasksAPI.updateTask(todoId, taskId, model)
                .then((response) => {
                    dispatch(changeTaskStatusAC(taskId, status, todoId))
                    dispatch(setLoadingStatusAC('succeeded'))
                })
        }
    }

export const updateTaskTC = (todoListId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
    async (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(setLoadingStatusAC('loading'))
        const state = getState()
        const tasks = state.tasks[todoListId].find((t) => t.id === taskId)
        if (!tasks) {
            console.warn('task not found in the state')
            return
        }
        const model: UpdateTaskModelType = {
            deadline: tasks.deadline,
            description: tasks.description,
            priority: tasks.priority,
            startDate: tasks.startDate,
            title: tasks.title,
            status: tasks.status,
            ...domainModel
        }
        try {
            const response = await tasksAPI.updateTask(todoListId, taskId, model)
            if (response.data.resultCode === ResultCode.OK) {
                dispatch(changeTaskTitleAC(taskId, domainModel, todoListId))
                dispatch(setLoadingStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, response.data)
            }
        } catch (e) {
            let errorMessage: string
            if (axios.isAxiosError<ErrorType>(e)) {
                errorMessage = e.response!.data.messages[0]
            } else {
                errorMessage = (e as Error).message
            }
            handleServerNetworkError(dispatch, errorMessage)
        }
    }
//types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
type ErrorType = {
    "statusCode": number,
    "messages": string[],
    "error": string
}