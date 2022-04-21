import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

let assignTaskParentID = (task, parentID) => {
    task.parentID = parentID;
    return task;
};

function App() {
  const [columnData, setColumnData] = useState([]);

  useEffect(() => {
    axios.get("https://my-json-server.typicode.com/IS322-Spring-22/Project-2/columns")
      .then(response => {
        response.data.map(column => {
          if (column.tasks) {
            column.tasks.map(task => {
              assignTaskParentID(task, column.id);
            });
          }
        });
        setColumnData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
