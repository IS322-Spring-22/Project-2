import React, { useState } from 'react';
import uniqueId from 'react-html-id';

const Form = ({ inputText, setInputText, todos, setTodos, setStatus }) => {
  const [type, setType] = useState('Task');

  uniqueId.enableUniqueIds(Form)

  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };

  const typeHandler = (e) => {
    setType(e.target.value)
  };

  const submitTodoHandler = (e) => {
    e.preventDefault();
    setTodos([
      ...todos, {text: inputText, status: 'Todo', type: type, id:Form.nextUniqueId()}
    ]);
    setInputText("");
  };

  return (
    <div className="col-8 mx-auto">
      <form className="d-flex">
        <div className="mb-3 input-group me-3">
          <input className="form-control" type="text" id="TodoInput" placeholder="Add Task" onChange={inputTextHandler} value={inputText}/>
          <select className="form-select" id="TodoType" placeholder="Enter Todo:" onChange={typeHandler}>
            <option value="Task">Task</option>
            <option value="Feature">Feature</option>
            <option value="Bug">Bug</option>
          </select>
          <button onClick={submitTodoHandler} className="input-group-text btn btn-success" type="submit">
            <i className="bi bi-plus-lg"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
