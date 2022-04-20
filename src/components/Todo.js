import React from 'react';

const Todo = ({todo, setTodos, todoList}) => {

  const deleteHandler = () => {
    setTodos(todoList.filter((el) => el.id !== todo.id));
  };

  const completeHandler = () => {
    setTodos(todoList.map((item) => {
      if (item.id === todo.id) {
        return {
          ...item, completed: !item.completed
        }
      }
      return item;
    }));
  };

  return (
    <div className={`card ${todo.completed ? 'border border-success' : ''}`} id={todo.id}>
      <div className="card-body d-flex align-items-center">
        <h4 className={`flex-fill`}>{todo.completed ? <del>{todo.text}</del> : `${todo.text}`}</h4>
        <div className="row gx-3">
          <div className="col">
            <button className="btn btn-primary" onClick={completeHandler}>
              <i className="bi bi-check-lg"></i>
            </button>
          </div>
          <div className="col">
            <button className="btn btn-danger" onClick={deleteHandler}>
              <i className="bi bi-trash2"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
