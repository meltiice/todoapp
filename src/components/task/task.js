import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import Timer from '../timer';

export default class Task extends Component {
  static defaultProps = {
    id: Date.now(),
    label: '',
    editing: false,
    done: false,
    createdTime: 0,
    onDeleted: () => {},
    onEditing: () => {},
    onToggleDone: () => {},
  };

  static propTypes = {
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
    updateTime: PropTypes.func,
    deleteTimer: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  state = {
    label: this.props.label,
    time: this.props.time
  };

  handleClick = () => {
    this.inputRef.current.focus();
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (e.key === 'Escape') {
      this.setState({
        label: this.props.label,
      });
      this.props.onEditing.call(this, this.props.id, this.props.label);
    }
    if (e.key === 'Enter') {
      this.props.onEditing.call(this, this.props.id, this.state.label);
    }
  };

  render() {
    const {
      id,
      editing,
      done,
      createdTime,
      time,
      onDeleted,
      onEditing,
      onToggleDone,
      updateTime,
      deleteTimer,
      play
    } = this.props;

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
            <span className="title" onClick={onToggleDone}>{this.state.label}</span>
            <Timer time={time} updateTime={updateTime} play={play} deleteTimer={deleteTimer}/>
            <span className="created description">created {date}</span>
          </label>
          <button
            className="icon icon-edit"
            onClick={() => {
              onEditing.call(this, id, this.state.label);
              this.handleClick.call(this);
            }}
          ></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>

        <input
          type="text"
          className="edit"
          value={this.state.label}
          onKeyUp={this.onSubmit}
          onChange={this.onLabelChange}
          ref={this.inputRef}
          onFocus={(e) => {
            e.preventDefault();
            console.log('Focused on input');
          }}
        ></input>
      </li>
    );
  }
}
