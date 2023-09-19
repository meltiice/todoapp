import { Component } from 'react';

import TaskList from '../taskList';
import NewTaskForm from '../newTaskForm';
import Footer from '../footer';

class App extends Component {
  id = 100;

  intervals = {};

  createToDoItem = (label, minutes = 0, seconds = 0) => ({
    id: this.id++,
    label,
    editing: false,
    done: false,
    createdTime: Date.now(),
    hidden: false,
    time: minutes * 60 + seconds,
    play: false
  });

  state = {
    todoData: [
      this.createToDoItem('Test task 1'),
      this.createToDoItem('Test task 2'),
      this.createToDoItem('Test task 3'),
    ],
    taskState: 'All',
  };

  componentDidUpdate() {
    this.state.todoData.forEach((task) => {
      if (!task.time) {
        this.deleteTimer(task.id)
      }
    })
  }

  updateTime = (id) => {
    const idx = this.state.todoData.findIndex((el) => el.id === id);

    if (!this.state.todoData[idx].play && this.state.todoData[idx] && this.state.todoData[idx].time) {
      let newInt = setInterval(() => {
        const idxInt = this.state.todoData.findIndex((el) => el.id === id);
        this.setState(({ todoData }) => {
          let { time } = todoData[idxInt];
          const play = Boolean(time);
          if (play) {
            time--
          }
          const newItem = { ...todoData[idxInt], time, play }
          const newArr = [...todoData.slice(0, idxInt), newItem, ...todoData.slice(idxInt + 1)]
          return {
            todoData: newArr
          }
        })
      }, 1000)

      this.intervals[String(this.state.todoData[idx].id)] = newInt;
    }
  }

  deleteTimer = (id) => {
    const idx = this.state.todoData.findIndex((el) => el.id === id);
    if (this.state.todoData[idx].play) {
      clearInterval(this.intervals[String(this.state.todoData[idx].id)])
      delete this.intervals[String(this.state.todoData[idx].id)]
      this.setState(({ todoData }) => {
        const play = false;
        const newItem = { ...todoData[idx], play }
        const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
        return {
          todoData: newArr
        }
    })
  }
}

  filterState = (data, changeValue, flag) => {
    const allData = [...data];
    allData.forEach((el) => {
      el.hidden = flag ? el[changeValue] : !el[changeValue];
    });
    return allData;
  };

  changeState = (target) => {
    switch (target) {
      case 'Completed':
        this.setState(({ todoData }) => ({
          todoData: this.filterState(todoData, 'done', 0),
          taskState: 'Completed',
        }));
        break;

      case 'Active':
        this.setState(({ todoData }) => ({
          todoData: this.filterState(todoData, 'done', 1),
          taskState: 'Active',
        }));
        break;

      default:
        this.setState(({ todoData }) => {
          const allData = [...todoData];
          allData.forEach((el) => {
            el.hidden = false;
          });
          return {
            todoData: allData,
            taskState: 'All',
          };
        });
        break;
    }
  };

  deleteItem = (id) => {
    this.deleteTimer(id)
    this.setState(({ todoData }) => {
      const newArr = todoData.filter((el) => el.id !== id);
      return {
        todoData: newArr,
      };
    });
  };

  addItem = (text, minutes, seconds) => {
    const newItem = this.createToDoItem(text, minutes, seconds);
    if (text) {
      this.setState(({ todoData }) => {
        const newArr = [...todoData, newItem];
        return {
          todoData: newArr,
        };
      });
    }
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
    this.state.todoData.forEach((elem) => {
      if (elem.done) {
        this.deleteTimer(elem.id)
      }
    })
    this.setState(({ todoData }) => {
      const newArr = todoData.filter((el) => el.done === false);
      return {
        todoData: newArr,
      };
    });
  };

  onEditing = (id, label) => {
    this.setState(({ todoData }) => {
      let newArr = this.toggleProperty(todoData, id, 'editing', label);
      const idx = newArr.findIndex((el) => el.id === id);
      let changeEditing = '';

      newArr.forEach((elem, index) => {
        if (index !== idx && elem.editing) {
          changeEditing = elem.id;
        }
      });
      if (changeEditing) {
        newArr = this.toggleProperty(newArr, changeEditing, 'editing');
      }
      return {
        todoData: newArr,
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => ({
      todoData: this.toggleProperty(todoData, id, 'done'),
    }));
  };

  render() {
    const { todoData, taskState } = this.state;
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;
    return (
      <section className="main">
        <NewTaskForm onItemAdded={this.addItem} />
        <TaskList
          toDos={todoData}
          onDeleted={this.deleteItem}
          onEditing={this.onEditing}
          onToggleDone={this.onToggleDone}
          onItemSave={this.onItemSave}
          updateTime={this.updateTime}
          deleteTimer={this.deleteTimer}
        />
        <Footer
          toDo={todoCount}
          taskState={taskState}
          deleteCompleted={this.deleteCompleted}
          changeState={this.changeState}
        />
      </section>
    );
  }
}

export default App;
