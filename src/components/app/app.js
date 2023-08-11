import React from "react";

import TaskList from "../taskList";
import NewTaskForm from "../newTaskForm";
import Footer from "../footer";

const App = () => {
  return (
    <section className="main">
      <NewTaskForm />
      <TaskList />
      <Footer />
    </section>
  );
};

export default App;