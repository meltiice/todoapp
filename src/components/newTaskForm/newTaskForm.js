import { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({ onItemAdded }) => {
  const [label, setLabel] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const onLabelChange = (e) => {
    setLabel(e.target.value)
  };

  const onMinutes = (e) => {
    setMinutes(e.target.value)
  };

  const onSeconds = (e) => {
    setSeconds(e.target.value)
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onItemAdded(label, Number(minutes), Number(seconds));
    setLabel('')
    setMinutes('')
    setSeconds('')
  };

  return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={onSubmit}>
          <input className="new-todo" onChange={onLabelChange} value={label} tabIndex={1}
            type="text" placeholder="Task" autoFocus/>
          <input type="number" className="new-todo-form__timer" placeholder="Min" tabIndex={2}
                 autoFocus onChange={onMinutes} value={minutes} min={0} max={5999}/>
          <input type="number" className="new-todo-form__timer" placeholder="Sec" tabIndex={3}
                 autoFocus onChange={onSeconds} value={seconds} min={0} max={59}/>
          <input type="submit" hidden />
        </form>
      </header>
    );
  }
NewTaskForm.defaultProps = {
  onItemAdded: () => {},
};
NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func,
};

export default NewTaskForm
