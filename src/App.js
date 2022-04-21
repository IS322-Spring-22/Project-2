import React, { useState, useEffect } from 'react';
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import Navbar from "./components/Navbar";

function App() {
  //State declarations
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [type, setType] = useState('All');
  const [status, setStatus] = useState('Todo');
  const [ filteredTodos, setFilteredTodos ] = useState([]);
  const [ currentPage, setCurrentPage ] = useState('');

  //use effects
  useEffect(() => filterHandler(), [todos, type, status]);

  //Functions
  const filterHandler = () => {
    switch(type){
      case 'All':
        return setFilteredTodos(todos.filter(todo => todo.status === status))
      default:
        return setFilteredTodos(todos.filter(todo => todo.type === type && todo.status === status))
    }
  };

  const pageDisplay = (currentPage) => {
    switch (currentPage){
      case 'home':
        return (<h1>Home Page</h1>);
      case 'add':
        return (<Form
          inputText={inputText}
          setInputText={setInputText}
          todos={todos}
          setTodos={setTodos}
        />);
      case 'list':
        return(<TodoList
          setTodos={setTodos}
          todos={filteredTodos}
          type={type}
          setType={setType}
          setStatus={setStatus}
        />);
    }
  }

  return (
    <div>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      <div className="container">
        <h1 className="text-center">Ido's Todo List</h1>
        {/*<Form
          inputText={inputText}
          setInputText={setInputText}
          todos={todos}
          setTodos={setTodos}
          setType={setType}
        />
        <TodoList
          setTodos={setTodos}
          todos={filteredTodos}
          type={type}
        />*/}
        {pageDisplay(currentPage)}

      </div>
    </div>
  );
}

export default App;
