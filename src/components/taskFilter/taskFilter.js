// import React from 'react';
import PropTypes from 'prop-types';

const TaskFilter = ({ changeState }) => (
  <ul className="filters">
    <li>
      <button onClick={changeState}>All</button>
    </li>
    <li>
      <button onClick={changeState}>Active</button>
    </li>
    <li>
      <button onClick={changeState}>Completed</button>
    </li>
  </ul>
);

TaskFilter.defaultProps = {
  changeState: () => {},
};
TaskFilter.propTypes = {
  changeState: PropTypes.func,
};

export default TaskFilter;
