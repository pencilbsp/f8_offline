import { useDispatch, useSelector } from "../core/hook";

export default function TodoForm() {
  const dispatch = useDispatch();
  const { todos } = useSelector();

  const handleCreateTodo = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const todo = formData.get("todo");
    const newTodo = { value: todo, id: todos.length + 1 };
    dispatch({ type: "todo/add", payload: newTodo });
    event.target.reset();
  };

  return (
    <form onSubmit={handleCreateTodo}>
      <input type="text" name="todo" />
      <button>Add</button>
    </form>
  );
}
