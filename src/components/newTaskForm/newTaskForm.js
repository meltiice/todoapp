import React from "react";

const NewTaskForm = ({addItem}) => {
   return (
      <header className="header">
        <h1>todos</h1>
        <input className="new-todo" placeholder="What needs to be done?" autoFocus onClick={addItem}/>
      </header>
   );
}

export default NewTaskForm;