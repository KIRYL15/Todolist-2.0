import {v1} from "uuid";
import {FilterValueType, TodolistType} from "../App";
import {todolistsReducer} from "./todolists-reducer";
//тесты на удаление тудулиста
test("correct todolist should be removed", () => {

    let todolistId_1 = v1()
    let todolistId_2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId_1, title: "What to learn", filter: "all"},
        {id: todolistId_2, title: "What to buy", filter: "all"},
    ]

    const endState = todolistsReducer(startState, {type: "REMOVE-TODOLIST", id: todolistId_1})

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId_2)

})
//тесты на добавление тудулиста
test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistType> =
        [
            {id: todolistId1, title: "What to learn", filter: "all"},
            {id: todolistId2, title: "What to buy", filter: "all"}
        ]

    const endState = todolistsReducer(startState, {type: "ADD-TODOLIST", title: newTodolistTitle})

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].filter).toBe("all");
    expect(endState[0].id).toBeDefined();
});
//тесты на изменение названия тудулиста
test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistsReducer(startState, {type: "CHANGE-TODOLIST-TITLE", id: todolistId2, title: newTodolistTitle});

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});
//тесты на изменение фильтра тудулиста
test('correct todolist should change be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValueType = "completed";

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistsReducer(startState, {type: "CHANGE-TODOLIST-FILTER", id: todolistId2, filter: newFilter});

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});