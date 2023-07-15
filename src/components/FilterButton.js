import React from "react";
export default function FilterButton(props) {
  return (
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed={props.btn_pressed ? "true" : "false"}
    >
      <span className="visually-hidden">Show </span>
      <span>{props.btn_text}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}
