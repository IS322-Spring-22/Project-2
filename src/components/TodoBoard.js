import React from 'react';

const TodoBoard = ({tasksData, setTasksData, setType, setStatus}) => {

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

        </div>
    );
};

export default TodoBoard;
