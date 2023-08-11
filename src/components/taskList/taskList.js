import React from "react";
import Task from "../task/task";

const TaskList = () => {
  const dataFile = [
    { label: "Test task 1", editing: false, id: 1},
    { label: "Test task 2", editing: false, id: 2},
    { label: "Test task 3", editing: false, id: 3}
  ]
  dataFile.forEach(i => i.id++);
  return (
    <ul className="todo-list">
        <Task label = "hello" />
        <Task label = "555"/>
    </ul>
  );
};

export default TaskList;
