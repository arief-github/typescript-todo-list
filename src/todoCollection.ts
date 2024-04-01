import { TodoItem } from "./todoItem.js";

type ItemCounts = {
    total: number,
    incomplete: number
}

export class TodoCollection {
    private nextId: number = 1;
    protected itemMap = new Map<number, TodoItem>();

    /**
     * Constructor for creating a new instance of the class.
     *
     * @param {string} userName - the name of the user
     * @param {TodoItem[]} todoItems - the list of todo items
     */

    constructor(public userName: string, public todoItems: TodoItem[] = []) {
        todoItems.forEach(item => this.itemMap.set(item.id, item));
    }

    /**
     * Adds a new todo item to the todo list.
     *
     * @param {string} task - The task to be added as a todo item.
     * @return {number} The ID of the newly added todo item.
     */

    addTodo(task: string): number {
        while(this.getTodoById(this.nextId)) {
            this.nextId++;
        }
        this.itemMap.set(this.nextId, new TodoItem(this.nextId, task));
        return this.nextId;
    }
 
    /**
     * Retrieves a TodoItem from the todoItems array by its ID.
     *
     * @param {number} id - The ID of the TodoItem to retrieve.
     * @return {TodoItem} The TodoItem with the specified ID, or undefined if not found.
     */

    getTodoById(id: number): TodoItem {
        return this.itemMap.get(id)
    }

    /**
     * A function for showing list of all items.
     *
     * @param {boolean} includeComplete - whether to include complete items
     * @return {TodoItem[]} filtered list of todo items
     */

    getTodoItems(includeComplete: boolean): TodoItem[] {
        return [...this.itemMap.values()].filter(item => includeComplete || !item.complete);
    }

    /**
     * Marks a todo item as complete or incomplete based on the given ID.
     *
     * @param {number} id - The ID of the todo item to mark as complete or incomplete.
     * @param {boolean} complete - The new completion status of the todo item.
    */

    markComplete(id: number, complete: boolean) {
        const todoItem = this.getTodoById(id);

        if(todoItem) {
            todoItem.complete = complete;
        }
    }

    /**
     * Removes all completed items from the itemMap.
     *
     * @return {void} This function does not return anything.
    */
    removeComplete(): void {
        this.itemMap.forEach(item => {
            if (item.complete) {
                this.itemMap.delete(item.id)
            }
        })
    }

    /**
     * Returns the counts of items in the itemMap.
     *
     * @return {ItemCounts} An object containing the total number of items
     * and the count of incomplete items.
     */

    getItemCounts(): ItemCounts {
        return {
            total: this.itemMap.size,
            incomplete: this.getTodoItems(false).length
        }
    }
}