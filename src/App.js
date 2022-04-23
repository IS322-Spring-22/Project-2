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
  const [ currentPage, setCurrentPage ] = useState('');
  const [ tasksData, setTasksData] = useState([]);

  //use effects
  useEffect(() => filterHandler(), [tasksData, type, status]);

  useEffect(() => {
    axios.get("https://my-json-server.typicode.com/IS322-Spring-22/Project-2/tasks")
      .then(response => {
        response.data.map(task => {
          if (task.tasks) {
            task.tasks.map(task => {
              assignTaskParentID(task, task.id);
            });
          }
        });
        setTasksData(response.data);
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
    getColumnNames: () => {
      return tasksData.map(task => {
        return task.name;
      });
    },
    getColumnTasks: (columnID) => {
      return tasksData.find(task => task.id === columnID).tasks;
    },
    getColumnTask: (columnID, taskID) => {
      return tasksData.find(task => task.id === columnID).tasks.find(task => task.id === taskID);
    },
    getColumn: (columnID) => {
      return tasksData.find(task => task.id === columnID);
    },
    getColumnID: (columnName) => {
      return tasksData.find(task => task.name === columnName).id;
    },
    getColumnIndex: (columnID) => {
      return tasksData.findIndex(task => task.id === columnID);
    },
    getColumnTaskIndex: (columnID, taskID) => {
      return tasksData.find(task => task.id === columnID).tasks.findIndex(task => task.id === taskID);
    },
      moveTaskToPreviousColumn: (columnID, taskID) => {
          let columnIndex = functions.getColumnIndex(columnID);
          let taskIndex = functions.getColumnTaskIndex(columnID, taskID);
          let previousColumnIndex = columnIndex - 1;
          if (previousColumnIndex < 0) {
              return;
          }
          let previousColumnID = tasksData[previousColumnIndex].id;
          let previousColumnTasks = functions.getColumnTasks(previousColumnID);
          let currColumnTasks = functions.getColumnTasks(columnID);
          let task = currColumnTasks[taskIndex];
          previousColumnTasks.push(task);
          task.id = previousColumnTasks.length;
          task.parentID = previousColumnID;
          currColumnTasks.splice(taskIndex, 1);
          tasksData[previousColumnIndex].tasks = previousColumnTasks;
          tasksData[columnIndex].tasks = currColumnTasks;
          setTasksData(tasksData);
      },
      moveTaskToNextColumn: (columnID, taskID) => {
          let columnIndex = functions.getColumnIndex(columnID);
          let taskIndex = functions.getColumnTaskIndex(columnID, taskID);
          let nextColumnIndex = columnIndex + 1;
          if (nextColumnIndex === tasksData.length) {
              return;
          }
          let nextColumnID = tasksData[nextColumnIndex].id;
          let nextColumnTasks = functions.getColumnTasks(nextColumnID);
          let currColumnTasks = functions.getColumnTasks(columnID);
          let task = currColumnTasks[taskIndex];
          nextColumnTasks.push(task);
          task.id = nextColumnTasks.length;
          task.parentID = nextColumnID;
          currColumnTasks.splice(taskIndex, 1);
          tasksData[nextColumnIndex].tasks = nextColumnTasks;
          tasksData[columnIndex].tasks = currColumnTasks;
          setTasksData(tasksData);
      },
      moveTaskToColumn: (columnID, taskID, newColumnID) => {
          let columnIndex = functions.getColumnIndex(columnID);
          let taskIndex = functions.getColumnTaskIndex(columnID, taskID);
          let newColumnIndex = functions.getColumnIndex(newColumnID);
          let newColumnTasks = functions.getColumnTasks(newColumnID);
          let currColumnTasks = functions.getColumnTasks(columnID);
          let task = currColumnTasks[taskIndex];
          newColumnTasks.push(task);
          task.id = newColumnTasks.length;
          task.parentID = newColumnID;
          currColumnTasks.splice(taskIndex, 1);
          tasksData[newColumnIndex].tasks = newColumnTasks;
          tasksData[columnIndex].tasks = currColumnTasks;
          setTasksData(tasksData);
      },
      removeTask: (columnID, taskID) => {
          let columnIndex = functions.getColumnIndex(columnID);
          let taskIndex = functions.getColumnTaskIndex(columnID, taskID);
          let currColumnTasks = functions.getColumnTasks(columnID);
          currColumnTasks.splice(taskIndex, 1);
          tasksData[columnIndex].tasks = currColumnTasks;
          setTasksData(tasksData);
      },
      addTask: (columnID, task) => {
        // Tasks have a name, type, and priority
          let columnIndex = functions.getColumnIndex(columnID);
          let currColumnTasks = functions.getColumnTasks(columnID);
          currColumnTasks.push(task);
          task.id = currColumnTasks.length;
          task.parentID = columnID;
          tasksData[columnIndex].tasks = currColumnTasks;
          setTasksData(tasksData);
      },
      getUniqueTaskTypes: () => {
          let uniqueTaskTypes = [];
          for (let i = 0; i < tasksData.length; i++) {
              let currColumnTasks = functions.getColumnTasks(tasksData[i].id);
              for (let j = 0; j < currColumnTasks.length; j++) {
                  let currTaskType = currColumnTasks[j].type;
                  if (!uniqueTaskTypes.includes(currTaskType)) {
                      uniqueTaskTypes.push(currTaskType);
                  }
              }
          }
          return uniqueTaskTypes;
      },
      getUniqueTaskPriorities: () => {
          let uniqueTaskPriorities = [];
          for (let i = 0; i < tasksData.length; i++) {
              let currColumnTasks = functions.getColumnTasks(tasksData[i].id);
              for (let j = 0; j < currColumnTasks.length; j++) {
                  let currTaskPriority = currColumnTasks[j].priority;
                  if (!uniqueTaskPriorities.includes(currTaskPriority)) {
                      uniqueTaskPriorities.push(currTaskPriority);
                  }
              }
          }
          return uniqueTaskPriorities;
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
