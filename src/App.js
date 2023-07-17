import React, { useState } from "react";
import { nanoid } from "nanoid";

import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function toggleTaskCompletedBug(id) {
    const i = tasks.findIndex((t) => t.id === id);
    console.log("Before map call");
    console.log(tasks[i]);
    tasks.map((t) => {
      if (t.id === id) {
        t.completed = !t.completed;
        return t;
      }
      return t;
    });

    if (i < 0) throw new Error("toggleTaskCompleted: Index not found");
    else {
      console.log("After map call: ");
      console.log(tasks[i]);
    }
  }

  function editTask(id, newName) {
    console.log("appel editTask depuis App.js, newName: " + newName);
    tasks.forEach((task) => {
      if (id == task.id) task.name = newName;
    });
    //setTasks([...tasks]);
    setTasks(tasks); // le bug est là, pour le résoudre décommenter au dessus et commenter cette ligne
    tasks.forEach((t) => console.log(t));
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((t) => {
      if (t.id === id) {
        t.completed = !t.completed;
        return t;
      }
      return t;
    });
    setTasks(updatedTasks);
    //const f = (t) => t.id === id;
    const i = tasks.findIndex((t) => t.id === id);
    if (i < 0) throw new Error("toggleTaskCompleted: Index not found");
    //else console.log(tasks[i]);

    //console.log(tasks[id]);
  }

  const taskList = tasks.map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
      //toggleTaskCompleted={toggleTaskCompletedBug}
    />
  ));
  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form
        addTask={addTask}
        label="What needs to be done ?"
        button_text="Add"
      />
      <div className="filters btn-group stack-exception">
        <FilterButton btn_text="All" />
        <FilterButton btn_text="Active" btn_pressed />
        <FilterButton btn_text="Completed" />
      </div>
      <h2 id="list-heading">`{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
