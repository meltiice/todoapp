import React from "react";
import TaskFilter from "../taskFilter";

const Footer = ({toDo, deleteCompleted, changeState}) => {
  return (
    <footer className="footer">
      <span className="todo-count">{toDo} items left</span>
      <TaskFilter changeState = {changeState}/>
      <button className="clear-completed" onClick={deleteCompleted}>Clear completed</button>
    </footer>
  );
};

export default Footer;
