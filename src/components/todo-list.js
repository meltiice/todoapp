import React from "react";
import TodoListItem from "./todo-list-item";

const TodoList = ({todo}) => {
   const elements = todo.map(item => {
      const {id, ...itemProps} = item;
      return <li key={id}><TodoListItem {...itemProps}/></li>
   })
   return (
     <ul>
       {elements}
     </ul>
   );
 };

 export default TodoList;