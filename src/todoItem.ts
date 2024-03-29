export class TodoItem {
    public id: number;
    public task: string;
    public complete: boolean = false;

    /**
     * Creates a new instance of the class with the specified ID and task.
     *
     * @param {number} id - The ID of the instance.
     * @param {string} task - The task associated with the instance.
     */

    public constructor(id: number, task: string, complete: boolean = false) {
        this.id = id;
        this.task = task;
        this.complete = complete;        
    }

     /**
     * A method to print the details of the task.
     */

    public printDetails() :void {
        console.log(`${this.id}\t${this.task}\t${this.complete ? "\t(complete)" : ""}`);       
    }
}