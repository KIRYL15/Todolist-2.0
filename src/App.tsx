import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}
export type FilterValueType = "all" | "active" | "completed"
type TodolistType = {
    id: string,
    title: string,
    filter: FilterValueType,
}
type TasksStateType = {
    [todolistId: string]: Array<TasksType>
}
type TodolistsStateType = Array<TodolistType>
export const App = (): JSX.Element => {
    //BLL
    //список тудулистов
    const todolistId_1 = v1()
    const todolistId_2 = v1()
    const [todolists, setTodolists] = useState<TodolistsStateType>([
        {id: todolistId_1, title: "What to learn", filter: "all"},
        {id: todolistId_2, title: "What to buy", filter: "all"},
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "REDUX", isDone: false},
        ],
        [todolistId_2]: [
            {id: v1(), title: "MILK", isDone: true},
            {id: v1(), title: "MEAT", isDone: false},
            {id: v1(), title: "BREAD", isDone: true},
        ]
    })
    //BLL
    const removeTask = (taskId: string, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)
        })
    }
    const addTask = (title: string, todolistId: string) => {
        const newTask: TasksType = {
            id: v1(),
            title: title,
            isDone: false
        }

        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
    const changeTodolistFilter = (filter: FilterValueType, todolistId: string) => {
        setTodolists(todolists.map(m => m.id === todolistId ? {...m, filter: filter} : m))
    }
    const changeTaskStatus = (tId: string, newIsDone: boolean, todolistId: string) => {
        debugger
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId]
                .map(m => m.id === tId ? {...m, isDone: newIsDone} : m)
        })
    }
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(f => f.id !== todolistId))
        //delete tasks[todolistId]
        const copyTasks = {...tasks}
        delete copyTasks[todolistId]
        setTasks(copyTasks)
    }
    const getFilteredTasks = (tasks: Array<TasksType>, filter: FilterValueType): Array<TasksType> => {
        switch (filter) {
            case "active":
                return tasks.filter(t => !t.isDone)
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }
    const addTodolist = (title: string) => {
        const newTodolistId = v1()
        const newTodolist: TodolistType = {
            id: newTodolistId,
            title: title,
            filter: 'all'
        }
        setTodolists([newTodolist,...todolists])
        setTasks({[newTodolistId]: [],...tasks})
    }
    const todolistsComponents = todolists
        .map(m => {
            const tasksForRender: Array<TasksType> = getFilteredTasks(tasks[m.id], m.filter)
            return (
                <Todolist
                    //данные
                    key={m.id}
                    todolistId={m.id}
                    title={m.title}
                    filter={m.filter}
                    tasks={tasksForRender}
                    //функции для тасок
                    removeTask={removeTask}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    //функции для тудулистов
                    changeTodolistFilter={changeTodolistFilter}
                    removeTodolist={removeTodolist}
                />
            )
        })
//UI
    return (
        <div className="App">
            <AddItemForm
                maxLenghtUserMessage={15}
                addNewItem={addTodolist}
            />
            {todolistsComponents}
        </div>
    );
}