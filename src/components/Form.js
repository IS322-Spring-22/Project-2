import React from 'react';
import uniqueId from 'react-html-id';

const Form = ({ inputText, setInputText, todos, setTodos, setStatus }) => {
  uniqueId.enableUniqueIds(Form)

  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };

  const submitTodoHandler = (e) => {
    e.preventDefault();
    setTodos([
      ...todos, {text: inputText, completed: false, id:Form.nextUniqueId()}
    ]);
    setInputText("");
  };

  const statusHandler = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div className="col-8 mx-auto">
      <form className="d-flex">
        <div className="mb-3 input-group me-3">
          <input className="form-control" type="text" id="TodoInput" placeholder="Enter Todo:" onChange={inputTextHandler} value={inputText}/>
          <button onClick={submitTodoHandler} className="input-group-text btn btn-success" type="submit">
            <i className="bi bi-plus-lg"></i>
          </button>
        </div>

        <div className="mb-3 input-group">
          <select className="form-select" name="TodoStatus" id="TodoStatus" onChange={statusHandler}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default Form;
