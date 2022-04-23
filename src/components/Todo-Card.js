import React from 'react';

const TodoCard = ({tasksData, setTasksData, todoList}) => {

  const deleteHandler = () => {
    setTasksData(todoList.filter((el) => el.id !== tasksData.id));
  };

  const completeHandler = () => {
    setTasksData(todoList.map((item) => {
      if (item.id === tasksData.id) {
        return {
          ...item, completed: !item.completed
        }
      }
      return item;
    }));
  };

  return (
    <div className={`card ${tasksData.completed ? 'border border-success' : ''}`} key={tasksData.id}>
      <div className="card-body d-flex align-items-center">
        <h4 className={`flex-fill`}>{tasksData.completed ? <del>{tasksData.text}</del> : `${tasksData.text}`}</h4>
        <h4 className={`flex-fill`}>{tasksData.type}</h4>
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

export default TodoCard;
