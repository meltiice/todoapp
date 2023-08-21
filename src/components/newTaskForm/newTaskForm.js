import { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  state = {
    label: '',
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onItemAdded(this.state.label);
    this.setState({
      label: '',
    });
  };

  render() {
    return (
      <header className="header">
        <form onSubmit={this.onSubmit}>
          <h1>todos</h1>
          <input
            className="new-todo"
            onChange={this.onLabelChange}
            placeholder="What needs to be done?"
            autoFocus
            value={this.state.label}
            type="text"
          />
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
