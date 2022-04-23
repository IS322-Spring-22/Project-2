import React, { useState, useEffect } from 'react';
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import Navbar from "./components/Navbar";
import axios from "axios";

let assignTaskParentID = (task, parentID) => {
    task.parentID = parentID;
    return task;
};

function App() {
  //State declarations
  const [inputText, setInputText] = useState("");
  const [type, setType] = useState('All');
  const [status, setStatus] = useState('task');
  const [ filteredTodos, setFilteredTasks ] = useState([]);
  const [ currentPage, setCurrentPage ] = useState('list');
  const [ tasksData, setTasksData] = useState([]);
  const [ columnData, setColumnData] = useState([]);

  //use effects
  useEffect(() => filterHandler(), [tasksData, type, status]);

  useEffect(() => {
    axios.get("https://my-json-server.typicode.com/IS322-Spring-22/Project-2/tasks")
      .then(response => {
        setTasksData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });

      axios.get("https://my-json-server.typicode.com/IS322-Spring-22/Project-2/statusOrder")
          .then(response => {
              setColumnData(response.data);
              console.log(response.data);
          })
          .catch(error => {
              console.log(error);
          });
  }, []);

  //Functions
  const filterHandler = () => {
    switch(type){
      case 'All':
        return setFilteredTasks(tasksData.filter(task => task.status === status))
      default:
        return setFilteredTasks(tasksData.filter(task => task.type === type && task.status === status))
    }
  };

  const pageDisplay = (currentPage) => {
    switch (currentPage){
      default:
      case 'home':
        return (<h1>Home Page</h1>);
      case 'add':
        return (<Form
          inputText={inputText}
          setInputText={setInputText}
          tasksData={tasksData}
          setTasksData={setTasksData}
        />);
      case 'list':
        return(<TodoList
          setTasksData={setTasksData}
          tasksData={tasksData}
          type={type}
          setType={setType}
          setStatus={setStatus}
        />);
    }
  }

  let functions = {
    getColumnsInOrder: () => {
      return columnData.map(column => {
        return column.name;
      });
    },
    getColumnTasks: (columnName) => {
      return tasksData.filter(task => task.status === columnName);
    },
    getTask: (taskID) => {
      return tasksData.find(task => task.id === taskID);
    },
      getTaskIndex(taskID) {
          return tasksData.findIndex(task => task.id === taskID);
      },
    getColumnIndex: (columnName) => {
      return columnData.findIndex(column => column.name === columnName);
    },
      moveTaskToPreviousColumn: (taskID) => {
        let task = functions.getTask(taskID);
        let nextColumn = functions.getColumnIndex(task.status) + 1;
        if (nextColumn < columnData.length) {
            task.status = columnData[nextColumn].name;
            setTasksData(tasksData);
        }
      },
      moveTaskToNextColumn: (taskID) => {
          let task = functions.getTask(taskID);
          let nextColumn = functions.getColumnIndex(task.status) - 1;
          if (nextColumn > -1) {
              task.status = columnData[nextColumn].name;
              setTasksData(tasksData);
          }
      },
      moveTaskToColumn: (taskID, newColumnName) => {
        let task = functions.getTask(taskID);
        task.status = newColumnName;
        setTasksData(tasksData);
      },
      removeTask: (taskID) => {
        let index = functions.getTaskIndex(taskID);
        tasksData.splice(index, 1);
        setTasksData(tasksData);
      },
      addTask: (columnName, task) => {
        let newTask = {
          id: tasksData.length,
          Type: task.Type,
          status: columnName,
          title: task.title
        };
        tasksData.push(newTask);
        setTasksData(tasksData);
      },
      getUniqueTaskTypes: () => {
        let types = [];
        tasksData.forEach(task => {
          if(!types.includes(task.Type)){
            types.push(task.Type);
          }
        });
        return types;
      },
  }

  return (
    <div>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      <div className="container">
        <h1 className="text-center">Ido's task List</h1>
        {pageDisplay(currentPage)}

      </div>
    </div>
  );
}

export default App;
