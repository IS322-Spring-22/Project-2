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

  let functions = {
    getColumnNames: () => {
      return columnData.map(column => {
        return column.name;
      });
    },
    getColumnTasks: (columnID) => {
      return columnData.find(column => column.id === columnID).tasks;
    },
    getColumnTask: (columnID, taskID) => {
      return columnData.find(column => column.id === columnID).tasks.find(task => task.id === taskID);
    },
    getColumn: (columnID) => {
      return columnData.find(column => column.id === columnID);
    },
    getColumnID: (columnName) => {
      return columnData.find(column => column.name === columnName).id;
    },
    getColumnIndex: (columnID) => {
      return columnData.findIndex(column => column.id === columnID);
    },
    getColumnTaskIndex: (columnID, taskID) => {
      return columnData.find(column => column.id === columnID).tasks.findIndex(task => task.id === taskID);
    },
      moveTaskToPreviousColumn: (columnID, taskID) => {
          let columnIndex = functions.getColumnIndex(columnID);
          let taskIndex = functions.getColumnTaskIndex(columnID, taskID);
          let previousColumnIndex = columnIndex - 1;
          if (previousColumnIndex < 0) {
              return;
          }
          let previousColumnID = columnData[previousColumnIndex].id;
          let previousColumnTasks = functions.getColumnTasks(previousColumnID);
          let currColumnTasks = functions.getColumnTasks(columnID);
          let task = currColumnTasks[taskIndex];
          previousColumnTasks.push(task);
          task.id = previousColumnTasks.length;
          task.parentID = previousColumnID;
          currColumnTasks.splice(taskIndex, 1);
          columnData[previousColumnIndex].tasks = previousColumnTasks;
          columnData[columnIndex].tasks = currColumnTasks;
          setColumnData(columnData);
      },
      moveTaskToNextColumn: (columnID, taskID) => {
          let columnIndex = functions.getColumnIndex(columnID);
          let taskIndex = functions.getColumnTaskIndex(columnID, taskID);
          let nextColumnIndex = columnIndex + 1;
          if (nextColumnIndex === columnData.length) {
              return;
          }
          let nextColumnID = columnData[nextColumnIndex].id;
          let nextColumnTasks = functions.getColumnTasks(nextColumnID);
          let currColumnTasks = functions.getColumnTasks(columnID);
          let task = currColumnTasks[taskIndex];
          nextColumnTasks.push(task);
          task.id = nextColumnTasks.length;
          task.parentID = nextColumnID;
          currColumnTasks.splice(taskIndex, 1);
          columnData[nextColumnIndex].tasks = nextColumnTasks;
          columnData[columnIndex].tasks = currColumnTasks;
          setColumnData(columnData);
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
          columnData[newColumnIndex].tasks = newColumnTasks;
          columnData[columnIndex].tasks = currColumnTasks;
          setColumnData(columnData);
      },
      removeTask: (columnID, taskID) => {
          let columnIndex = functions.getColumnIndex(columnID);
          let taskIndex = functions.getColumnTaskIndex(columnID, taskID);
          let currColumnTasks = functions.getColumnTasks(columnID);
          currColumnTasks.splice(taskIndex, 1);
          columnData[columnIndex].tasks = currColumnTasks;
          setColumnData(columnData);
      },
      addTask: (columnID, task) => {
        // Tasks have a name, type, and priority
          let columnIndex = functions.getColumnIndex(columnID);
          let currColumnTasks = functions.getColumnTasks(columnID);
          currColumnTasks.push(task);
          task.id = currColumnTasks.length;
          task.parentID = columnID;
          columnData[columnIndex].tasks = currColumnTasks;
          setColumnData(columnData);
      },
      getUniqueTaskTypes: () => {
          let uniqueTaskTypes = [];
          for (let i = 0; i < columnData.length; i++) {
              let currColumnTasks = functions.getColumnTasks(columnData[i].id);
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
          for (let i = 0; i < columnData.length; i++) {
              let currColumnTasks = functions.getColumnTasks(columnData[i].id);
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
    <div className="App">
      <header className="App-header">
        <p>
          Add your components here fellow code monkeys!
        </p>
      </header>
    </div>
  );
}

export default App;
