import React from 'react';

const ToDoCard = ({functions, task}) => {

    const advanceHandler = (e) => {
        functions.moveTaskToNextColumn(task.id);
    };

    const retractHandler = (e) => {
        functions.moveTaskToPreviousColumn(task.id);
    }

    return (
        <div className={`card mb-2`} key={task.id}>
            <div className="card-body align-items-center">
                <h5 className="">{task.title}</h5>
                <p className="mb-0">Type: {task.Type}</p>
                <p className="">ID: {task.id}</p>

                { task.status !== "Todo" ? (
                    <button className="btn btn-primary" onClick={retractHandler}>
                        <i className="bi bi-arrow-left" />
                    </button>
                ) : null }

                { task.status !== "Done" ? (
                    <button className="btn btn-primary ms-1" onClick={advanceHandler}>
                        <i className="bi bi-arrow-right" />
                    </button>
                ) : null }

            </div>
        </div>
    );
}

export default ToDoCard;
