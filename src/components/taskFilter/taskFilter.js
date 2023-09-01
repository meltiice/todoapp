// import React from 'react';
import PropTypes from "prop-types";

const TaskFilter = ({ changeState, taskState }) => {
  const classNames = {
    All: "",
    Active: "",
    Completed: "",
  };
  classNames[taskState] += "selected";
  return (
    <ul className="filters">
      <li>
        <button className={classNames.All} onClick={changeState}>
          All
        </button>
      </li>
      <li>
        <button className={classNames.Active} onClick={changeState}>
          Active
        </button>
      </li>
      <li>
        <button className={classNames.Completed} onClick={changeState}>
          Completed
        </button>
      </li>
    </ul>
  );
};

TaskFilter.defaultProps = {
  changeState: () => {},
  taskState: "",
};
TaskFilter.propTypes = {
  changeState: PropTypes.func,
  taskState: PropTypes.string,
};

export default TaskFilter;
