import React, {useCallback} from 'react';
import ToDoCard from "./ToDo-Card";

const TodoBoard = ({functions, tasksData}) => {
    
    const loadBoard = useCallback(() => {
        console.log("loadBoard loaded.");
        return(
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
        );
    }, [tasksData]);

    return(
        loadBoard()
    );
};

export default TodoBoard;
