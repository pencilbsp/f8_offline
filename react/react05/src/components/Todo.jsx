import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, todoSlice } from "../redux/slice/todoSlice";

const { addTodo } = todoSlice.actions;

export default function Todo() {
  const dispath = useDispatch();
  const { list: todoList, posts } = useSelector((state) => state.todo);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newTodo = formData.get("new-todo");
    newTodo && dispath(addTodo(newTodo));
    event.target.reset();
  };

  useEffect(() => {
    dispath(fetchPosts());
  }, []);

  console.log(posts);

  return (
    <div>
      <ul>
        {todoList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input type="text" name="new-todo" />
        <button>Thêm</button>
      </form>
    </div>
  );
}
