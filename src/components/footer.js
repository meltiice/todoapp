import React from "react";
import TaskFilter from './taskFilter'

const Footer = () => {
   return (
      <footer className="footer">
          <span className="todo-count">1 items left</span>
          <ul className="filters">
            <li>
              <TaskFilter />
            </li>
            <li>
               <TaskFilter />
            </li>
            <li>
               <TaskFilter />
            </li>
          </ul>
          <button className="clear-completed">Clear completed</button>
        </footer>
   );
}

export default Footer;