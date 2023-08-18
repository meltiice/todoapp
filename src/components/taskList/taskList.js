import React, { Component } from "react";
import Task from "../task/task";

class TaskList extends Component {
  /*
  state = {
    currentEditingLabel: ''
  }

  onLabelChange = (e) => {
    console.log(e.target);
    this.setState({
      currentEditingLabel: e.target.value
   })
 }*/
  render() {
    const {todos, onDeleted, onEditing, onToggleDone, onItemSave} = this.props
    const elements = todos.map((item) => {
      return (
          <Task key = {item.id}
            { ...item }
            onDeleted = {()=> onDeleted(item.id)}
            onEditing = {onEditing}
            onToggleDone = {() => onToggleDone(item.id)}
            onItemSave = {() => onItemSave(item.id)}
          />
      )
    })
    return (
      <ul className="todo-list">
        {elements}
      </ul>
    );
  }
  
};

export default TaskList;
