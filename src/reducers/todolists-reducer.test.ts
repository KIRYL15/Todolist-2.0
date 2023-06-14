import {v1} from "uuid";
import {
    ChangeTodolistFilterAC,
     FilterValueType,
} from "../features/TodolistsList/todolists-reducer";
import {TaskStatuses, TodolistType} from "../api/todolists-api";

//объявляем переменные, чтобы устранить проблему с областью видимости
let todolistId_1: string
let todolistId_2: string
let startState: Array<TodolistType>
//необходима для того чтобы не повторять часть кода
beforeEach(() => {
    todolistId_1 = v1()
    todolistId_2 = v1()
    /*startState = [
        {id: todolistId_1, title: "What to learn", filter:TaskStatuses.Completed},
        {id: todolistId_2, title: "What to buy", filter: "all"},
    ]*/
})
//тесты на удаление тудулиста
test("correct todolist should be removed", () => {

    //const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId_1))
    //expect(endState.length).toBe(1)
    /*expect(endState[0].id).toBe(todolistId_2)*/
})
//тесты на добавление тудулиста
test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";

    //const endState = todolistsReducer(startState, AddTodolistAC(newTodolistTitle))
    /*expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].filter).toBe("all");
    expect(endState[0].id).toBeDefined();*/
});
//тесты на изменение названия тудулиста
test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

 /*   const endState = todolistsReducer(startState, ChangeTodolistTitleAC(todolistId_2, newTodolistTitle));*/

    /*expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);*/
});
//тесты на изменение фильтра тудулиста
test('correct todolist should change be changed', () => {

    let newFilter: FilterValueType = "completed";
    const action = ChangeTodolistFilterAC(todolistId_2, newFilter)
/*
    const endState = todolistsReducer(startState, action);
*/

    /*expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);*/
});