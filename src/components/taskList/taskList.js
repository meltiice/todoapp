import { Component } from 'react';
import PropTypes from 'prop-types';
import Task from '../task/task';

class TaskList extends Component {
  static defaultProps = {
    toDos: [],
    onDeleted: () => {},
    onEditing: () => {},
    onToggleDone: () => {},
  };

  static propTypes = {
    toDos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        label: PropTypes.string,
        editing: PropTypes.bool,
        done: PropTypes.bool,
        createdTime: PropTypes.number,
      }),
    ),
    onDeleted: PropTypes.func,
    onEditing: PropTypes.func,
    onToggleDone: PropTypes.func,
  };

  render() {
    const { toDos, onDeleted, onEditing, onToggleDone } = this.props;
    const elements = toDos.reduce((acc, item) => {
      if (!item.hidden) {
        acc.push(
          <Task
            key={item.id}
            {...item}
            onDeleted={() => onDeleted(item.id)}
            onEditing={onEditing}
            onToggleDone={() => onToggleDone(item.id)}
          />,
        );
      }
      return acc;
    }, []);
    return <ul className="todo-list">{elements}</ul>;
  }
}

export default TaskList;
