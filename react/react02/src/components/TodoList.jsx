import { useEffect, useState } from "react";

export default function TodoList({ todo }) {
  const [todos, setTodos] = useState([
    { id: 1, name: "Todo 1" },
    { id: 2, name: "Todo 2" },
  ]);

  useEffect(() => {
    setTodos([...todos, { name: todo, id: todos.length + 1 }]);
  }, [todo]);

  return (
    <div>
      {todos.map(({ name, id }) => (
        <h3 key={id}>{name}</h3>
      ))}
    </div>
  );
}
