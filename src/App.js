import React, { useState } from 'react';
import Form from "./components/Form";
import TodoList from "./components/TodoList";


function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);

  return (
    <div className="container">
      <h1 className="text-center">Ido's Todo List</h1>
      <Form
        inputText={inputText}
        setInputText={setInputText}
        todos={todos}
        setTodos={setTodos}/>
      <TodoList setTodos={setTodos} todos={todos}/>
    </div>
  );
}

export default App;
