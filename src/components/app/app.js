import { useState, useEffect } from 'react';

import TaskList from '../taskList';
import NewTaskForm from '../newTaskForm';
import Footer from '../footer';

const App = () => {
  const [idxTask, setIdxtask] = useState(100);
  const createToDoItem = (label, minutes = 0, seconds = 0) => ({
    id: idxTask,
    label,
    editing: false,
    done: false,
    createdTime: Date.now(),
    hidden: false,
    time: minutes * 60 + seconds,
    play: false
  });

  const [taskState, setTaskState] = useState('All');
  const [todoData, setTodoData] = useState([])
  const [intervals, setIntervals] = useState({})

  const startTime = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);

    if (!todoData[idx].play && todoData[idx] && todoData[idx].time) {
      let newInt = setInterval(() => {
        setTodoData((data) => {
          const currentIdx = data.findIndex((el) => el.id === id);
          const play = Boolean(data[currentIdx].time);
          if (play) {
            data[currentIdx].time--
          }
          const time = play ? data[currentIdx].time-- : data[currentIdx].time
          const newItem = { ...data[currentIdx], time, play }
          const newArr = [...data.slice(0, currentIdx), newItem, ...data.slice(currentIdx + 1)]
          return newArr
        })
      }, 1000);

      setIntervals((ints) => {
        const newInts = { ...ints }
        newInts[String(id)] = newInt;
        return newInts
      })
    }
  }

  const deleteTimer = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    if (todoData[idx].play) {
      clearInterval(intervals[String(todoData[idx].id)])
      setIntervals((ints) => {
        const newInts = { ...ints }
        delete ints[String(id)]
        return newInts
      })
      const play = false;
      const newItem = { ...todoData[idx], play };
      const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      setTodoData(newArr)
    }
  }

  useEffect(() => {
    todoData.forEach((task) => {
      if (!task.time) {
        deleteTimer(task.id)
      }
    })
  })

  const filterState = (data, changeValue, flag) => {
    const allData = [...data];
    allData.forEach((el) => {
      el.hidden = flag ? el[changeValue] : !el[changeValue];
    });
    return allData;
  };

  const changeState = (target) => {
    switch (target) {
      case 'Completed':
        setTodoData(filterState(todoData, 'done', 0));
        setTaskState('Completed');
        break;

      case 'Active':
        setTodoData(filterState(todoData, 'done', 1));
        setTaskState('Active');
        break;

      case 'All':
        setTodoData((data) => {
          const allData = [...data];
          allData.forEach((el) => {
            el.hidden = false;
          });
          return allData;
        });
        setTaskState('All');
        break;

      default:
        break
    }
  };

  const deleteItem = (id) => {
    deleteTimer(id)
    const newArr = todoData.filter((el) => el.id !== id);
    setTodoData(newArr);
  };

  const addItem = (text, minutes, seconds) => {
    const newItem = createToDoItem(text, minutes, seconds);
    setIdxtask((idx) => idx + 1)
    if (text) {
      const newArr = [...todoData, newItem];
      setTodoData(newArr);
    }
  };

  const toggleProperty = (arr, id, propName, label) => {
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

  const deleteCompleted = () => {
    todoData.forEach((elem) => {
      if (elem.done) {
        deleteTimer(elem.id)
      }
    })
    const newArr = todoData.filter((el) => el.done === false);
    setTodoData(newArr);
  };

  const onEditing = (id, label) => {
    let newArr = toggleProperty(todoData, id, 'editing', label);
    const idx = newArr.findIndex((el) => el.id === id);
    let changeEditing = '';

    newArr.forEach((elem, index) => {
        if (index !== idx && elem.editing) {
          changeEditing = elem.id;
        }
    });
    if (changeEditing) {
       newArr = toggleProperty(newArr, changeEditing, 'editing');
    }
    setTodoData(newArr);
  };

  const onToggleDone = (id) => {
  setTodoData((data) => {
      const newArr = toggleProperty(data, id, 'done')
      return newArr
    })
  };

  const doneCount = todoData.filter((el) => el.done).length;
  const todoCount = todoData.length - doneCount;
  return (
      <section className="main">
        <NewTaskForm onItemAdded={addItem} />
        <TaskList
          toDos={todoData}
          onDeleted={deleteItem}
          onEditing={onEditing}
          onToggleDone={onToggleDone}
          startTime={startTime}
          deleteTimer={deleteTimer}
        />
        <Footer
          toDo={todoCount}
          taskState={taskState}
          deleteCompleted={deleteCompleted}
          changeState={changeState}
        />
      </section>
    );
}

export default App;
