import React from 'react';
import ToDoCard from "./ToDo-Card";

const TodoBoard = ({functions, tasksData, setTasksData, setType, setStatus}) => {

    const typeHandler = (e) => {
        setType(e.target.value);
    };

    const statusHandler = (e) => {
        setStatus(e.target.value)
    };

    return(
        <div className="container">
            <form className="d-flex justify-content-center">
                <div className="mb-3 me-3">
                    <label className="form-label" htmlFor="TaskType">Task Type:</label>
                    <select className="form-select" id="TaskType" onChange={typeHandler}>
                        <option value="All">All</option>
                        <option value="Task">Task</option>
                        <option value="Feature">Feature</option>
                        <option value="Bug">Bug</option>
                    </select>
                </div>
                <div className="mb-3 me-3">
                    <label className="form-label" htmlFor="StatusType">Task Status:</label>
                    <select className="form-select" id="StatusType" onChange={statusHandler}>
                        <option value="All">All</option>
                        <option value="Todo">Todo</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Review">Review</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
            </form>
            <div className="row alight-items-start">
                <div className="col border rounded-3">
                    <h3>Todo</h3>
                    <div>
                        {functions.getColumnTasks("Todo").map(task => (
                            <ToDoCard functions={functions} task={task} key={task.id} />
                        ))}
                    </div>
                </div>
                <div className="col border rounded-3">
                    <h3>In Progress</h3>
                    <div>
                        {functions.getColumnTasks("In Progress").map(task => (
                            <ToDoCard functions={functions} task={task} key={task.id} />
                        ))}
                    </div>
                </div>
                <div className="col border rounded-3">
                    <h3>Review</h3>
                    <div>
                        {functions.getColumnTasks("Review").map(task => (
                            <ToDoCard functions={functions} task={task} key={task.id} />
                        ))}
                    </div>
                </div>
                <div className="col border rounded-3">
                    <h3>Done</h3>
                    <div>
                        {functions.getColumnTasks("Done").map(task => (
                            <ToDoCard functions={functions} task={task} key={task.id} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodoBoard;
