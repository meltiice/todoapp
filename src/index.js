import React from "react";
import { createRoot } from "react-dom/client";
//import Task from './components/task'
import TaskList from "./components/taskList";
import NewTaskForm from "./components/newTaskForm";
import Footer from "./components/footer";

const App = () => {
 
  return (
    <section className="main">
      <NewTaskForm />
      <TaskList />
      <Footer />
    </section>
  );
};
const container = document.querySelector(".todoapp");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);

/*import AppHeader from './components/todo-appheader';
import SearchPanel from './components/todo-search-panel';
import TodoList from "./components/todo-list";

const App = () => {
  const toDoData = [
    { label: 'Drink coffee', important: false, id: 1},
    { label: 'Go to sleep', important: true, id: 2},
    { label: 'Do react tasks', important: false, id: 3}
  ];
  return (
    <div>
      <AppHeader />
      <SearchPanel />
      <TodoList todo={toDoData}/>
    </div>
  );
};
const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
*/