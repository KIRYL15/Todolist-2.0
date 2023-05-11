import {Dispatch} from "redux";
import {TasksStateType} from "../App";
import {AppRootStateType} from "./store";
import {AddTodolistAT, ChangeTodolistTitleAC, RemoveTodolisAT, SetTodolistsTypeAT} from "./todolists-reducer";
import {tasksAPI, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolists-api";

export type RemoveTaskActionType = ReturnType<typeof removeTasksAC>
export type AddTaskActionType = ReturnType<typeof addTasksAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type SetTasksAT = ReturnType<typeof setTasksAC>

export type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistAT
    | RemoveTodolisAT
    | SetTodolistsTypeAT
    | SetTasksAT
let initialState: TasksStateType = {

}
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
                        ? {...m, title: action.title}
                        : m)
            }
        }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.todolistId]: []
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
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        taskId,
        title,
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
export const createTaskTC = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    tasksAPI.createTask(todoListId, title)
        .then((response) => {
            dispatch(addTasksAC(response.data.data.item, todoListId))
        })
}
export const getTasksTC = (todoListId: string) => (dispatch: Dispatch) => {
    tasksAPI.getTasks(todoListId)
        .then((response) => {
            dispatch(setTasksAC(todoListId, response.data.items))
        })
}
export const deleteTaskTC = (todoListId: string, taskId: string) => (dispatch: Dispatch) => {
    tasksAPI.deleteTask(todoListId, taskId)
        .then((response) => {
            dispatch(removeTasksAC(taskId, todoListId))
        })
}
export const changeTaskStatusTC = (todoId:string, taskId:string, status:TaskStatuses) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const tasks=getState().tasks[todoId].find((t)=>t.id===taskId)
        console.log("task", tasks)

        if(tasks){
            const model:UpdateTaskModelType={
                title:tasks.title,
                deadline:tasks.deadline,
                startDate:tasks.startDate,
                priority:tasks.priority,
                description:tasks.description,
                status
        }
            tasksAPI.updateTask(todoId, taskId, model)
                .then((response) => {
                    dispatch(changeTaskStatusAC(taskId, status, todoId))
                })
        }
}

export const changeTaskTitleTC = (todoListId:string, taskId:string, title:string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const tasks=getState().tasks[todoListId].find((t)=>t.id===taskId)
        console.log("task", tasks)
        if(tasks){
            const model:UpdateTaskModelType={
                title,
                deadline:tasks.deadline,
                startDate:tasks.startDate,
                priority:tasks.priority,
                description:tasks.description,
                status:tasks.status
            }
            tasksAPI.updateTask(todoListId, taskId, model)
                .then((response) => {
                    dispatch(changeTaskTitleAC(taskId, title, todoListId))
                })
        }

    }
