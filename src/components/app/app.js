import { Component } from "react";

import TaskList from "../taskList";
import NewTaskForm from "../newTaskForm";
import Footer from "../footer";

class App extends Component {
  id = 100;

  createToDoItem = (label) => ({
    id: this.id++,
    label,
    editing: false,
    done: false,
    createdTime: Date.now(),
  });

  state = {
    todoData: [
      this.createToDoItem("Test task 1"),
      this.createToDoItem("Test task 2"),
      this.createToDoItem("Test task 3"),
    ],
    hiddenData: [],
  };
  pip = () => {}
  changeState = (event) => {
    const target = event.target.innerHTML;
    switch (target) {
      case "Completed":
        this.setState(({ todoData, hiddenData }) => {
          const allData = [...todoData, ...hiddenData];
          const hidden = allData.filter((el) => el.done === false);
          const visible = allData.filter((el) => el.done === true);
          return {
            todoData: visible,
            hiddenData: hidden,
          };
        });
        break;

      case "Active": // if (x === 'value2')
        this.setState(({ todoData, hiddenData }) => {
          const allData = [...todoData, ...hiddenData];
          const hidden = allData.filter((el) => el.done === true);
          const visible = allData.filter((el) => el.done === false);
          return {
            todoData: visible,
            hiddenData: hidden,
          };
        });
        break;

      default:
        this.setState(({ todoData, hiddenData }) => {
          const allData = [...todoData, ...hiddenData].sort((a, b) =>
            a.id > b.id ? 1 : -1,
          );
          return {
            todoData: allData,
            hiddenData: [],
          };
        });
        break;
    }
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArr,
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createToDoItem(text);
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];
      return {
        todoData: newArr,
      };
    });
  };

  toggleProperty = (arr, id, propName, label) => {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    let newItem;
    if (label) {
      newItem = { ...oldItem, [propName]: !oldItem[propName], label };
    } else {
      newItem = { ...oldItem, [propName]: !oldItem[propName] };
    }
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  deleteCompleted = () => {
    this.setState(({ todoData }) => {
      const newArr = todoData.filter((el) => el.done === false);
      return {
        todoData: newArr,
      };
    });
  };

  onEditing = (id, label) => {
    this.setState(({ todoData }) => ({
      todoData: this.toggleProperty(todoData, id, "editing", label),
    }));
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => ({
      todoData: this.toggleProperty(todoData, id, "done"),
    }));
  };

  render() {
    const { todoData, hiddenData } = this.state;
    const doneCount =
      todoData.filter((el) => el.done).length +
      hiddenData.filter((el) => el.done).length;
    const todoCount = todoData.length + hiddenData.length - doneCount;

    return (
      <section className="main">
        <NewTaskForm onItemAdded={this.addItem} />
        <TaskList
          toDos={todoData}
          onDeleted={this.deleteItem}
          onEditing={this.onEditing}
          onToggleDone={this.onToggleDone}
          onItemSave={this.onItemSave}
        />
        <Footer
          toDo={todoCount}
          deleteCompleted={this.deleteCompleted}
          changeState={this.changeState}
        />
      </section>
    );
  }
}

export default App;
