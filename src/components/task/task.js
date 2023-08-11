import React, {Component} from "react";

export default class Task extends Component {

   state = {
      done: false,
      editing: false,
      label: this.props.label
   }

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
   }
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
      const { done, editing } = this.state;

      let classNames = '';
      if (done) {
         classNames += ' completed';
      }
      if (editing) {
         classNames += ' editing'
      }
      return (
         <li className={classNames}>
            <div className = "view">
               <input className="toggle" type="checkbox"/>
               <label onClick={this.onTaskClick}>
                  <span className="description">{ this.state.label }</span>
                  <span className="created">created 17 seconds ago</span>
               </label>
               <button className="icon icon-edit" onClick={this.onEditing}></button>
               <button className="icon icon-destroy"></button>
            </div>
            <input type="text" className="edit" value={ this.state.label } onChange={this.handleChange}></input>
         </li>
      );
   }
};