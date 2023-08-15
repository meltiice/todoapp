import React, {Component} from "react";

import TaskList from "../taskList";
import NewTaskForm from "../newTaskForm";
import Footer from "../footer";

class App extends Component {

  maxId = 100;

  createToDoItem = (label) => {
    return {
      id: this.maxId++,
      label: label,
      editing: false, 
      done: false
    }
  }
  state = {
     todoData: [
      this.createToDoItem("Test task 1 to kill a man"),
      this.createToDoItem("Test task 2"),
      this.createToDoItem("Test task 3")
    ]
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex(el => el.id === id);

      const newArr = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];
      return {
        todoData: newArr
      }
    })
  }
  addItem = (text) => {
    console.log('Add ', text);
    const newItem = this.createToDoItem(text);
    this.setState (({ todoData })=> {
      const newArr = [...todoData, newItem]
      return newArr;
    });
  }
  toggleProperty = (arr, id, propName) => {
      // update object
      const idx = arr.findIndex (el => el.id === id);
      const oldItem = arr[idx];
      const newItem = {...oldItem, [propName]: !oldItem[propName]};
      // construct new arr
      console.log(propName, id, newItem)
      return [
        ...arr.slice(0, idx),
        newItem,
        ...arr.slice(idx + 1)
      ];
  }
  onEditing = (id) => {
    console.log('editing ', id);
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'editing')
      }
    })
  };
  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    })
  };
  render () {
    const {todoData} = this.state
    const doneCount = todoData.filter(el => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <section className="main">
        <NewTaskForm onItemAdded = {this.addItem} />
        <TaskList 
          todos = {todoData}
          onDeleted = {this.deleteItem}
          onEditing = {this.onEditing}
          onToggleDone = {this.onToggleDone}
        />
        <Footer toDo = {todoCount} done = {doneCount} />
      </section>
    );
  };
};

export default App;