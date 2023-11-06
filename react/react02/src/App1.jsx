import { useState } from "react";
// import Counter from "./components/Counter";
// import Login from "./components/Login";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  // return <Counter />;
  // return <Login />
  const [todo, setTodo] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const f = new FormData(event.target);
    setTodo(f.get("name"));
  };

  return (
    <div>
      <TodoForm onSubmit={handleSubmit} />
      <TodoList todo={todo} />
    </div>
  );
}

export default App;
