import React from 'react';
import TodoCard from "./Todo-Card";
import ToDoTableRow from "./ToDo-Table-Row";

const TodoList = ({todos, setTodos, setType}) => {

  const typeHandler = (e) => {
    setType(e.target.value);
  };

  return(
    <div className="container">
      <form className="d-flex">
        <div className="mb-3 input-group me-3">
          <select className="form-select" id="TaskType" onChange={typeHandler}>
            <option value="All">All</option>
            <option value="Task">Task</option>
            <option value="Feature">Feature</option>
            <option value="Bug">Bug</option>
          </select>
        </div>
      </form>
      <table className="table table-striped">
        <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Status</th>
          <th scope="col">Type</th>
        </tr>
        </thead>
        <tbody>
        {todos.map(todo =>(
          <ToDoTableRow todoList={todos}
                    setTodos={setTodos}
                    todo={todo}/>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
