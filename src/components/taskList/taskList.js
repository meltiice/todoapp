import React from "react";
import Task from "../task/task";

const TaskList = ({todos, onDeleted, onEditing, onToggleDone}) => {
 
  const elements = todos.map((item) => {
    const {id, ...itemProps} = item;
    let classNames = '';
      if (item.done) {
         classNames += ' completed';
      }
    return (
      <li key={id} className={classNames}>
        <Task 
          {...itemProps}
          onDeleted = {()=> onDeleted(id)}
          onEditing = {() => onEditing(id)}
          onToggleDone = {() => onToggleDone(id)}
        />
      </li>
    )
  })
  return (
    <ul className="todo-list">
      {elements}
    </ul>
  );
};

export default TaskList;
