import React, {Component} from "react";
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns'

export default class Task extends Component {

   static defaultProps = {
      id: Date.now(),
      label: '',
      editing: false,
      done: false, 
      createdTime: 0,
      onDeleted: () => {},
      onEditing: () => {}, 
      onToggleDone: () => {}
   }
   static propTypes = {
      id: PropTypes.number,
      label: PropTypes.string,
      editing: PropTypes.bool,
      done: PropTypes.bool, 
      createdTime: PropTypes.number,
      onDeleted: PropTypes.func,
      onEditing: PropTypes.func, 
      onToggleDone: PropTypes.func
   }

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
      const { id, editing, done, createdTime, onDeleted, onEditing, onToggleDone} = this.props;
      let classNames = '';  
      if (done) {
         classNames += ' completed';
        }
        if (editing) {
         classNames += ' editing'
        }
      
      const date = formatDistanceToNow(new Date().setTime(createdTime), {addSuffix: true, includeSeconds: true});
      return (
         <li className={classNames}>
         <div className = "view">
            <input className="toggle" type="checkbox"/>
            <label onClick={onToggleDone}>
               <span className="description">{ this.state.label }</span>
               <span className="created">created {date}</span>
            </label>
            <button className="icon icon-edit" onClick={onEditing.bind(this, id, this.state.label)}></button>
            <button className="icon icon-destroy" onClick={onDeleted}></button>
         </div>
         
         <input type="text" className="edit" value={ this.state.label } onKeyUp={this.onSubmit} onChange={this.onLabelChange}></input>
         
         </li>
      );
   }
};
