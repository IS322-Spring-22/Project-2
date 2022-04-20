import React, { useState, useEffect } from 'react';
import Form from "./components/Form";
import TodoList from "./components/TodoList";


function App() {
  //State declarations
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [ filteredTodos, setFilteredTodos] = useState([]);

  //use effects
  useEffect(() => filterHandler(), [todos, status]);

  //Functions
  const filterHandler = () => {
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">Ido's Todo List</h1>
      <Form
        inputText={inputText}
        setInputText={setInputText}
        todos={todos}
        setTodos={setTodos}
        setStatus={setStatus}
      />
      <TodoList
        setTodos={setTodos}
        todos={filteredTodos}
        status={status}
      />
    </div>
  );
}

export default App;
