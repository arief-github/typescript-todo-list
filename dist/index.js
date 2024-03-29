"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todoItem_1 = require("./todoItem");
const todoCollection_1 = require("./todoCollection");
let todos = [
    new todoItem_1.TodoItem(1, "Buy Flowers"),
    new todoItem_1.TodoItem(2, "Get Dog Food"),
    new todoItem_1.TodoItem(3, "Sew Your Wardrobe", true),
    new todoItem_1.TodoItem(4, "Feed Your Cat", true)
];
let collection = new todoCollection_1.TodoCollection("arief", todos);
console.clear();
console.log(`${collection.userName}'s Todo List`);
// let newId: number = collection.addTodo("Go for run");
// let todoItem: TodoItem = collection.getTodoById(newId);
// todoItem.printDetails()
// collection.addTodo(todoItem);
// collection.removeComplete();
console.log(`${collection.userName}'s Todo List` + `(${collection.getItemCounts().incomplete} items left uncomplete)`);
collection.getTodoItems(true).forEach(item => item.printDetails());
