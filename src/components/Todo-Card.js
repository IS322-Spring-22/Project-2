import React from 'react';

const ToDoCard = ({functions, task}) => {

    const advanceHandler = (e) => {
        e.preventDefault();
        functions.moveTaskToNextColumn(task.id);
    };

    return (
        <div className={`card`} key={task.id}>
            <div className="card-body align-items-center">
                <h5 className={``}>{task.title}</h5>
                <p className="">ID: {task.id}</p>
                <p>Type: {task.Type}</p>
                <button className="btn btn-primary" onClick={advanceHandler}>
                    <i className="bi bi-check-lg"></i>
                </button>
            </div>
        </div>
    );
}

export default ToDoCard;
