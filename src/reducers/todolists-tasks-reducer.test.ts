import {TasksStateType} from "../app/App";
import {tasksReducer} from "../features/TodolistsList/tasks-reducer";
import {AddTodolistAC, todolistsReducer} from "../features/TodolistsList/todolists-reducer";
import {TodolistType} from "../api/todolists-api";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistType> = [];

    //const action = AddTodolistAC("new todolist");

    //const endTasksState = tasksReducer(startTasksState, action)
    //const endTodolistsState = todolistsReducer(startTodolistsState, action)

    //const keys = Object.keys(endTasksState);
    //const idFromTasks = keys[0];
    //const idFromTodolists = endTodolistsState[0].id;

    //expect(idFromTasks).toBe(action.todolistId);
    //expect(idFromTodolists).toBe(action.todolistId);
});
