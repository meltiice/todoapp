import React, {Component} from "react";

export default class TaskFilter extends Component {
   render () {
      const {changeState} = this.props;
      return (
         <ul className="filters">
            <li>
               <button onClick={changeState}>All</button>
            </li>
            <li>
               <button onClick={changeState}>Active</button>
            </li>
            <li>
               <button onClick={changeState}>Completed</button>
            </li>
         </ul>
      )
   }
}