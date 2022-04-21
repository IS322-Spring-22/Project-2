import React, { useState, useEffect } from 'react';
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import Navbar from "./components/Navbar";

function App() {
  //State declarations
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [ filteredTodos, setFilteredTodos ] = useState([]);
  const [ currentPage, setCurrentPage ] = useState('');

  //use effects
  useEffect(() => filterHandler(), [todos, status]);

  //Functions
  const filterHandler = () => {
    switch(status){
      case 'Task':
        setFilteredTodos(todos.filter(todo => todo.type === 'Task'));
        break;
      case 'Feature':
        setFilteredTodos(todos.filter(todo => todo.type === 'Feature'));
        break;
      case 'Bug':
        setFilteredTodos(todos.filter(todo => todo.type === 'Bug'));
        break;
      default:
        setFilteredTodos(todos);
        break;
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
          status={status}
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
          setStatus={setStatus}
        />
        <TodoList
          setTodos={setTodos}
          todos={filteredTodos}
          status={status}
        />*/}
        {pageDisplay(currentPage)}

      </div>
    </div>
  );
}

export default App;
