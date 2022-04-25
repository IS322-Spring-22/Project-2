import React, {useCallback, useEffect, useState} from 'react';
import ToDoCard from "./ToDo-Card";

const TodoBoard = ({functions, tasksData}) => {

    const [currentColumn, setCurrentColumn] = useState(window.innerWidth <= 768 ? ("Todo") : "All");

    useEffect(() => {
        function handleResize(){
            if(window.innerWidth <= 768){
                setCurrentColumn("Todo");
                document.getElementById("ColumnType").selectedIndex = 0;
            }
            else{
                setCurrentColumn("All");
            }
        }
        window.addEventListener('resize', handleResize)
    })

    const columnHandler = (e) => {
        setCurrentColumn(e.target.value);
    }
    
    const loadBoard = useCallback(() => {
        switch(currentColumn){
            case "All":
                return(
                    <div className="row alight-items-start">
                        {columnTodo()}
                        {columnInProgress()}
                        {columnReview()}
                        {columnDone()}
                    </div>
                );
            case "Todo":
                return(
                    <div>
                        <select className="form-select" id="ColumnType" onChange={columnHandler}>
                            <option value="Todo" >Todo</option>
                            <option value="In Progress" >In Progress</option>
                            <option value="Review">Review</option>
                            <option value="Done">Done</option>
                        </select>
                        <div className="row alight-items-start">
                            {columnTodo()}
                        </div>
                    </div>
                );
            case "In Progress":
                return(
                    <div>
                        <select className="form-select" id="ColumnType" onChange={columnHandler}>
                            <option value="Todo" >Todo</option>
                            <option value="In Progress" >In Progress</option>
                            <option value="Review">Review</option>
                            <option value="Done">Done</option>
                        </select>
                        <div className="row alight-items-start">
                            {columnInProgress()}
                        </div>
                    </div>
                );
            case "Review":
                return(
                    <div>
                        <select className="form-select" id="ColumnType" onChange={columnHandler}>
                            <option value="Todo" >Todo</option>
                            <option value="In Progress" >In Progress</option>
                            <option value="Review">Review</option>
                            <option value="Done">Done</option>
                        </select>
                        <div className="row alight-items-start">
                            {columnReview()}
                        </div>
                    </div>
                );
            case "Done":
                return(
                    <div>
                        <select className="form-select" id="ColumnType" onChange={columnHandler}>
                            <option value="Todo" >Todo</option>
                            <option value="In Progress" >In Progress</option>
                            <option value="Review">Review</option>
                            <option value="Done">Done</option>
                        </select>
                        <div className="row alight-items-start">
                            {columnDone()}
                        </div>
                    </div>
                );
        }
    }, [tasksData, currentColumn]);

    const columnTodo = () => {
        return(
            <div className="col border rounded-3 me-2">
                <h3>Todo</h3>
                <div>
                    {functions.getColumnTasks("Todo").map(task => (
                        <ToDoCard functions={functions} task={task} key={task.id} />
                    ))}
                </div>
            </div>
        );
    }

    const columnInProgress = () => {
        return(
            <div className="col border rounded-3 me-2">
                <h3>In Progress</h3>
                <div>
                    {functions.getColumnTasks("In Progress").map(task => (
                        <ToDoCard functions={functions} task={task} key={task.id} />
                    ))}
                </div>
            </div>
        );
    }

    const columnReview = () => {
        return(
            <div className="col border rounded-3 me-2">
                <h3>Review</h3>
                <div>
                    {functions.getColumnTasks("Review").map(task => (
                        <ToDoCard functions={functions} task={task} key={task.id} />
                    ))}
                </div>
            </div>
        );
    }

    const columnDone = () => {
        return(
            <div className="col border rounded-3">
                <h3>Done</h3>
                <div>
                    {functions.getColumnTasks("Done").map(task => (
                        <ToDoCard functions={functions} task={task} key={task.id} />
                    ))}
                </div>
            </div>
        );
    }

    return(
        loadBoard()
    );
};

export default TodoBoard;
