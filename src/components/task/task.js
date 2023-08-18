import React, {Component} from "react";

export default class Task extends Component {

   state = {
      label: this.props.label
   }

   onLabelChange = (e) => {
      this.setState({
         label: e.target.value
      })
      
   }
   
   onSubmit = (e) => {
      e.preventDefault();
      if (e.key === 'Enter') {
         this.props.onEditing.call(this, this.props.id, this.state.label)
      }
   }

   render () {
      const { id, editing, done, onDeleted, onEditing, onToggleDone} = this.props;
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
            <label onClick={onToggleDone}>
               <span className="description">{ this.state.label }</span>
               <span className="created">created 17 seconds ago</span>
            </label>
            <button className="icon icon-edit" onClick={onEditing.bind(this, id, this.state.label)}></button>
            <button className="icon icon-destroy" onClick={onDeleted}></button>
         </div>
         
         <input type="text" className="edit" value={ this.state.label } onKeyUp={this.onSubmit} onChange={this.onLabelChange}></input>
         
         </li>
      );
   }
};

/*
<form onSubmit={this.onSubmit}>
         <input type="text" className="edit" value={ this.state.label } onChange={this.onLabelChange} ></input>
         </form>
*/