import PropTypes from 'prop-types';
import Task from '../task/task';

const TaskList = ({ toDos, onDeleted, onEditing, onToggleDone, startTime, deleteTimer }) => {
  const elements = toDos.reduce((acc, item) => {
    if (!item.hidden) {
      acc.push(
        <Task
          key={item.id}
          {...item}
          onDeleted={() => onDeleted(item.id)}
          onEditing={onEditing}
          onToggleDone={() => onToggleDone(item.id)}
          startTime={() => startTime(item.id)}
          deleteTimer={() => deleteTimer(item.id)}
        />,
      );
    }
    return acc;
  }, []);
  return <ul className="todo-list">{elements}</ul>;
}
TaskList.defaultProps = {
  toDos: [],
  onDeleted: () => {},
  onEditing: () => {},
  onToggleDone: () => {},
};
TaskList.propTypes = {
  toDos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
      editing: PropTypes.bool,
      done: PropTypes.bool,
      createdTime: PropTypes.number
    }),
  ),
  onDeleted: PropTypes.func,
  onEditing: PropTypes.func,
  onToggleDone: PropTypes.func,
  startTime: PropTypes.func,
  deleteTimer: PropTypes.func
};

export default TaskList;
