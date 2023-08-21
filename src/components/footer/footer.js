// import React from 'react';
import PropTypes from 'prop-types';
import TaskFilter from '../taskFilter';

function Footer({ toDo, deleteCompleted, changeState }) {
  return (
    <footer className="footer">
      <span className="todo-count">{toDo} items left</span>
      <TaskFilter changeState={changeState} />
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
};
Footer.propTypes = {
  toDo: PropTypes.number,
  deleteCompleted: PropTypes.func,
  changeState: PropTypes.func,
};
export default Footer;
