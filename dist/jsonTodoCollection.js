import { TodoItem } from "./todoItem.js";
import { TodoCollection } from "./todoCollection.js";
import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";
export class JsonTodoCollection extends TodoCollection {
    userName;
    database;
    /**
     * Initializes a new instance of the TodoCollection class with the specified user name and optional array of todo items.
     *
     * @param {string} userName - The name of the user.
     * @param {TodoItem[]} [todoItems=[]] - Optional array of todo items.
     */
    constructor(userName, todoItems = []) {
        super(userName, []);
        this.userName = userName;
        this.database = new LowSync(new JSONFileSync("Todos.json"));
        this.database.read();
        if (this.database.data === null) {
            this.database.data = { tasks: todoItems };
            this.database.write();
            todoItems.forEach(item => this.itemMap.set(item.id, item));
        }
        else {
            this.database.data.tasks.forEach(item => {
                this.itemMap.set(item.id, new TodoItem(item.id, item.task, item.complete));
            });
        }
    }
    /**
     * Adds a new todo task to the todo collection and stores the updated tasks.
     *
     * @param {string} task - The task to be added.
     * @return {number} The result of adding the task to the collection.
     */
    addTodo(task) {
        let result = super.addTodo(task);
        this.storeTasks();
        return result;
    }
    markComplete(id, complete) {
        super.markComplete(id, complete);
        this.storeTasks();
    }
    /**
     * Removes the complete task from the collection and stores the updated tasks.
     *
     * @param {void} - No parameters
     * @return {void} - No return value
     */
    removeComplete() {
        super.removeComplete();
        this.storeTasks();
    }
    /**
     * Stores the tasks in the database by updating the 'tasks' property with the values from the itemMap.
     * Then writes the updated database to disk.
     */
    storeTasks() {
        this.database.data.tasks = [...this.itemMap.values()];
        this.database.write();
    }
}
