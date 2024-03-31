export class TodoItem {
    id;
    task;
    complete = false;
    /**
     * Creates a new instance of the class with the specified ID and task.
     *
     * @param {number} id - The ID of the instance.
     * @param {string} task - The task associated with the instance.
     */
    constructor(id, task, complete = false) {
        this.id = id;
        this.task = task;
        this.complete = complete;
    }
    /**
    * A method to print the details of the task.
    */
    printDetails() {
        console.log(`${this.id}\t${this.task}\t${this.complete ? "\t(complete)" : ""}`);
    }
}
