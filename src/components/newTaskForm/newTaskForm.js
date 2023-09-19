import { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  state = {
    label: '',
    minutes: '',
    seconds: ''
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onMinutes = (e) => {
    this.setState({
      minutes: e.target.value,
    });
  };

  onSeconds = (e) => {
    this.setState({
      seconds: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { label, minutes, seconds } = this.state;
    this.props.onItemAdded(label, Number(minutes), Number(seconds));
    this.setState({
      label: '',
      minutes: '',
      seconds: ''
    });
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.onSubmit}>
          <input className="new-todo" onChange={this.onLabelChange} value={this.state.label}
            type="text" placeholder="Task" autoFocus/>
          <input type="number" className="new-todo-form__timer" placeholder="Min"
                 autoFocus onChange={this.onMinutes} value={this.state.minutes} min={0} max={5999}/>
          <input type="number" className="new-todo-form__timer" placeholder="Sec"
                 autoFocus onChange={this.onSeconds} value={this.state.seconds} min={0} max={59}/>
          <input type="submit" hidden />
        </form>
      </header>
    );
  }
}
NewTaskForm.defaultProps = {
  onItemAdded: () => {},
};
NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func,
};
