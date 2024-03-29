import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";

let todos: TodoItem[] = [
    new TodoItem(1, "Buy Flowers"),
    new TodoItem(2, "Get Dog Food"),
    new TodoItem(3, "Sew Your Wardrobe", true),
    new TodoItem(4, "Feed Your Cat", true)
];

let collection: TodoCollection = new TodoCollection("arief", todos);

console.clear();
console.log(`${collection.userName}'s Todo List`);

// let newId: number = collection.addTodo("Go for run");
// let todoItem: TodoItem = collection.getTodoById(newId);

// todoItem.printDetails()

// collection.addTodo(todoItem);

// collection.removeComplete();

console.log(`${collection.userName}'s Todo List` + `(${collection.getItemCounts().incomplete} items left uncomplete)`);

collection.getTodoItems(true).forEach(item => item.printDetails())