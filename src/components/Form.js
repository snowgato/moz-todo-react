import React, { useState } from "react";
import { createPortal } from "react-dom";

export default function Form(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [name, setName] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (name === "") {
      alert("Task name can't be empty");
      return;
    }
    props.addTask(name);
    setName("");
  }
  function handleChange(e) {
    setName(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          {props.label}
        </label>
      </h2>
      <input
        type="text"
        value={name}
        onChange={handleChange}
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
      />
      <button type="submit" className="btn btn__primary btn__lg">
        {props.button_text}
      </button>
    </form>
  );
}
