import React, {Component} from "react";

export default class Task extends Component {
   /*
   onTaskClick = () => {
      this.setState (({ done })=> {
         return {
            done: !done
         }
      });
   }
   onEditing = () => {
      this.setState(({ editing }) => {
         return {
            editing: !editing
         }
      });
   }*/
   
   handleChange = (event) => {
      this.setState({label: event.target.value});
      event.target.addEventListener( 'keyup', event => {
         event.preventDefault();
         //console.log(1);
         console.log(event.code);
         if( event.code === 'Enter' ) {
            this.setState({editing: false, label: event.target.value});
         };
       });
    }
   render () {
      const { label, editing, onDeleted, onEditing, onToggleDone} = this.props
      let styleTask = "display: none";
      if (editing) {
         styleTask = "display: block"
      }
      console.log(styleTask);

      return (
         <div className = "view">
            <input className="toggle" type="checkbox"/>
            <label onClick={onToggleDone}>
               <span className="description">{ label }</span>
               <span className="created">created 17 seconds ago</span>
            </label>
            <button className="icon icon-edit" onClick={onEditing}></button>
            <button className="icon icon-destroy" onClick={onDeleted}></button>
            <input type="text" className="edit" value={ label } onChange={onEditing}></input>
         </div>

      );
   }
};