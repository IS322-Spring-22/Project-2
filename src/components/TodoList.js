import React from 'react';
import Todo from "./Todo";

const TodoList = ({todos, setTodos}) => {
  return(
    <div className="container">
      <div className="row gy-2">
        {todos.map(todo =>(
          <Todo todoList={todos}
                setTodos={setTodos}
                todo={todo}/>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
