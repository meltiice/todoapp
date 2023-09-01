// import React from 'react';
import PropTypes from "prop-types";
import TaskFilter from "../taskFilter";

function Footer({ toDo, taskState, deleteCompleted, changeState }) {
  return (
    <footer className="footer">
      <span className="todo-count">{toDo} items left</span>
      <TaskFilter changeState={changeState} taskState={taskState} />
      <button className="clear-completed" onClick={deleteCompleted}>
        Clear completed
      </button>
    </footer>
  );
}
Footer.defaultProps = {
  toDo: 0,
  deleteCompleted: () => {},
  changeState: () => {},
  taskState: "",
};
Footer.propTypes = {
  toDo: PropTypes.number,
  deleteCompleted: PropTypes.func,
  changeState: PropTypes.func,
  taskState: PropTypes.string,
};
export default Footer;
