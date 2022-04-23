import React from 'react';

const ToDoTableRow = ({task}) =>{

  return (
    <tr key={task.id}>
      <td>{task.title}</td>
      <td>{task.status}</td>
      <td>{task.Type}</td>
    </tr>
  );
}

export default ToDoTableRow;
