import { TodoItem } from "./todoItem.js";
import inquirer from 'inquirer';
import { JsonTodoCollection } from "./jsonTodoCollection.js";
let todos = [
    new TodoItem(1, "Buy Flowers"),
    new TodoItem(2, "Get Dog Food", true),
    new TodoItem(3, "Sew Your Wardrobe", true),
    new TodoItem(4, "Feed Your Cat", true)
];
let collection = new JsonTodoCollection("arief", todos);
let showComplete = true;
console.clear();
console.log(`${collection.userName}'s Todo List`);
// let newId: number = collection.addTodo("Go for run");
// let todoItem: TodoItem = collection.getTodoById(newId);
// todoItem.printDetails()
// collection.addTodo(todoItem);
// collection.removeComplete();
function displayTodoList() {
    console.log(`${collection.userName}'s Todo List` + `(${collection.getItemCounts().incomplete} items left uncomplete)`);
    // collection.getTodoItems(true).forEach(item => item.printDetails())
    collection.getTodoItems(showComplete).forEach(item => item.printDetails());
}
;
var Commands;
(function (Commands) {
    Commands["Add"] = "Add";
    Commands["Quit"] = "Quit";
    Commands["Toggle"] = "Show/Hide Complete";
    Commands["Complete"] = "Complete Task";
    Commands["Purge"] = "Remove Completed Tasks";
})(Commands || (Commands = {}));
/**
 * Prompts the user to enter a task and adds it to the collection.
 *
 * @return {void} This function does not return anything.
 */
function promptAdd() {
    console.clear();
    inquirer.prompt({
        type: "input",
        name: "add",
        message: "Enter Task => "
    }).then(answer => {
        if (answer['add'] !== '') {
            collection.addTodo(answer['add']);
        }
        promptUser();
    });
}
function promptComplete() {
    console.clear();
    inquirer.prompt({
        type: 'checkbox',
        name: 'completed',
        message: 'Mark Task Complete',
        choices: collection.getTodoItems(showComplete).map(item => ({
            name: item.task,
            value: item.id,
            checked: item.complete
        }))
    }).then(answer => {
        let completedTask = answer['completed'];
        collection.getTodoItems(true).forEach(item => collection.markComplete(item.id, completedTask.find(id => id === item.id) != undefined));
        promptUser();
    });
}
/**
 * Prompts the user to choose an option from a list of commands.
 *
 * @return {void} This function does not return anything.
 */
function promptUser() {
    console.clear();
    displayTodoList();
    inquirer.prompt({
        type: "list",
        name: "command",
        message: "choose option",
        choices: Object.values(Commands),
    }).then((answers) => {
        switch (answers["command"]) {
            case Commands.Toggle:
                showComplete = !showComplete;
                promptUser();
                break;
            case Commands.Add:
                promptAdd();
                break;
            case Commands.Complete:
                if (collection.getItemCounts().incomplete > 0) {
                    promptComplete();
                }
                else {
                    promptUser();
                }
                break;
            case Commands.Purge:
                collection.removeComplete();
                promptUser();
                break;
        }
    });
}
// call the function
promptUser();
