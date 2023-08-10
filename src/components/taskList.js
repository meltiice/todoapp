import React from "react";
import Task  from "./task";

const TaskList = () => {
   return (
      <ul className="todo-list">
         <li><Task /></li>
         <li><Task /></li> 
      </ul>
   );
}

export default TaskList;