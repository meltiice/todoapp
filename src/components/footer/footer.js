import React from "react";
import TaskFilter from "../taskFilter";

const Footer = ({toDo, done}) => {
  return (
    <footer className="footer">
      <span className="todo-count">{toDo} items left</span>
      <TaskFilter />
      <button className="clear-completed">Clear completed</button>
    </footer>
  );
};

export default Footer;
