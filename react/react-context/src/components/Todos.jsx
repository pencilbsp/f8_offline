import { useSelector } from "../core/hook";

export default function Todos() {
  const { todos } = useSelector();

  return (
    <ul>
      <h1>Hello</h1>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.value}</li>
      ))}
    </ul>
  );
}
