import {Dispatch} from 'redux'
import {SetErrorACType, setLoadingStatusAC, SetStatusACType} from '../../app/app-reducer'
import {LoginType} from "./Login";
import {authAPI, ResultCode} from "../../api/todolists-api";
import {handleServerAppError} from "../../utils/error-utils";
import {ClearTodosDataAC, ClearTodosDataACType} from "../TodolistsList/todolists-reducer";

const initialState = {
    isLoggedIn: false,
    isInitialized: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case 'login/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)
export const setIsInitializedAC = (isInitialized: boolean) =>
    ({type: 'login/SET-IS-INITIALIZED', isInitialized} as const)
// thunks
export const loginTC = (data: LoginType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setLoadingStatusAC('loading'))
    authAPI.login(data)
        .then((response) => {
            if (response.data.resultCode === ResultCode.OK) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setLoadingStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, response.data)
            }
        })
        .catch((error) => {
            handleServerAppError(dispatch, error)

        })
}
export const initializeAppTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setLoadingStatusAC('loading'))
    authAPI.me()
        .then((response) => {
            if (response.data.resultCode === ResultCode.OK) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setLoadingStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, response.data)
            }
        })
        .catch((error) => {
            handleServerAppError(dispatch, error)
        })
        .finally(() => {
            dispatch(setIsInitializedAC(true))
        })
}
export const logOutTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setLoadingStatusAC('loading'))
    authAPI.logOut()
        .then((response) => {
            if (response.data.resultCode === ResultCode.OK) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setLoadingStatusAC('succeeded'))
                dispatch(ClearTodosDataAC())
            } else {
                handleServerAppError(dispatch, response.data)
            }
        })
        .catch((error) => {
            handleServerAppError(dispatch, error)
        })
}
// types
type ActionsType =
    ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setIsInitializedAC>
    | SetStatusACType
    | SetErrorACType
    | ClearTodosDataACType