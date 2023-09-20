import { useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import Timer from '../timer';

const Task = ({ id, editing, label, done, createdTime, time, onDeleted, onEditing, onToggleDone, startTime, deleteTimer, play }) => {
  const [taskLabel, setTaskLabel] = useState(label);

  const onLabelChange = (e) => {
    setTaskLabel(e.target.value)
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (e.key === 'Escape') {
      setTaskLabel(label)
      onEditing.call(this, id, label);
    }
    if (e.key === 'Enter') {
      onEditing.call(this, id, taskLabel);
    }
  };

  let classNames = '';
  classNames += done ? ' completed' : '';
  classNames += editing ? ' editing' : '';

  const date = formatDistanceToNow(new Date().setTime(createdTime), {
    addSuffix: true,
    includeSeconds: true,
  });

  return (
      <li className={classNames}>
        <div className="view" id="five">
          <input
            className="toggle"
            type="checkbox"
            checked={done}
            onChange={onToggleDone}
          />
          <label htmlFor='for'>
            <span className="title" onClick={onToggleDone}>{taskLabel}</span>
            <Timer time={time} startTime={() => startTime()} play={play} deleteTimer={() => deleteTimer()}/>
            <span className="created description">created {date}</span>
          </label>
          <button
            className="icon icon-edit"
            onClick={() => {
              onEditing.call(this, id, taskLabel);
            }}
          ></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>

        <input
          type="text"
          className="edit"
          value={taskLabel}
          onKeyUp={onSubmit}
          onChange={onLabelChange}
          onFocus={(e) => {
            e.preventDefault();
            console.log('Focused on input');
          }}
        ></input>
      </li>
    );
}

Task.defaultProps = {
  id: Date.now(),
  label: '',
  editing: false,
  done: false,
  createdTime: 0,
  onDeleted: () => {},
  onEditing: () => {},
  onToggleDone: () => {},
};

Task.propTypes = {
  id: PropTypes.number,
  label: PropTypes.string,
  editing: PropTypes.bool,
  done: PropTypes.bool,
  time: PropTypes.number,
  play: PropTypes.bool,
  createdTime: PropTypes.number,
  onDeleted: PropTypes.func,
  onEditing: PropTypes.func,
  onToggleDone: PropTypes.func,
  startTime: PropTypes.func,
  deleteTimer: PropTypes.func
};

export default Task
