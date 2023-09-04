// import React from 'react';
import PropTypes from 'prop-types';

const TaskFilter = ({ changeState, taskState }) => {
  const arrayOfNamesForBtns = ['All', 'Active', 'Completed'];
  const filters = arrayOfNamesForBtns.map((btn) => (
      <li key ={btn}>
        <button className={taskState === btn ? 'selected' : ''} onClick={() => changeState(btn)}>
          {btn}
        </button>
      </li>
    ))
  return (
    <ul className="filters">
     {filters}
    </ul>
  );
};

TaskFilter.defaultProps = {
  changeState: () => {},
  taskState: '',
};
TaskFilter.propTypes = {
  changeState: PropTypes.func,
  taskState: PropTypes.string,
};

export default TaskFilter;
