import React from 'react';

const ToDoTableRow = ({todo, setTodos, todoList}) =>{

  return (
    <tr key={todo.id}>
      <td>{todo.text}</td>
      <td>{todo.status}</td>
      <td>{todo.type}</td>
    </tr>
  );
}

export default ToDoTableRow;
