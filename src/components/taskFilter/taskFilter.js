// import React from 'react';
import PropTypes from 'prop-types';

const TaskFilter = ({ changeState, taskState }) => {
  let classAll = '';
  let classCompleted = '';
  let classActive = '';

  if (taskState === 'All') {
    classAll += 'selected';
  } else if (taskState === 'Completed') {
    classCompleted += 'selected';
  } else if (taskState === 'Active') {
    classActive += 'selected';
  }

  return (
    <ul className="filters">
      <li>
        <button className={classAll} onClick={changeState}>All</button>
      </li>
      <li>
        <button className={classActive} onClick={changeState}>Active</button>
      </li>
      <li>
        <button className={classCompleted} onClick={changeState}>Completed</button>
      </li>
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
