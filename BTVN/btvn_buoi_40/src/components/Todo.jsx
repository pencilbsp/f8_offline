import { toast } from "sonner";
import { Component } from "react";
import { LogOutIcon } from "lucide-react";

import TodoItem from "./TodoItem";
import request from "../utils/request";

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.load = false;
    this.state = { todos: [], isLoading: false };
  }

  handleDeleteTodo = async (id) => {
    this.setState({
      todos: [...this.state.todos].filter(({ _id }) => id !== _id),
    });
  };

  handleFormSubmit = async (event) => {
    this.setState({ isLoading: true });

    try {
      event.preventDefault();
      const formData = new FormData(event.target);
      const todo = formData.get("todo");
      if (!todo) return;

      const response = await request.http("/todos", {
        method: "POST",
        body: { todo },
      });

      const data = await response.json();
      if (![200, 201].includes(data.code)) throw new Error(data.message);

      this.setState({ todos: [...this.state.todos, data.data] });
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }

    this.setState({ isLoading: false });
  };

  handleLogout = () => {
    request.setAuth(null, null);
  };

  componentDidUpdate = async () => {
    try {
      if (this.props.user && !this.load) {
        const response = await request.http("/todos");
        const data = await response.json();
        if (Array.isArray(data.data.listTodo)) {
          this.setState({ todos: data.data.listTodo });
        }
      }
    } catch (error) {
      toast.error("Có lỗi, vui lòng tải lại trang 😱");
    }
    this.load = true;
  };

  render() {
    return (
      <div className="p-4 bg-sky-950 text-white flex flex-col items-center gap-4 max-w-lg mx-auto rounded-xl">
        <div className="text-center font-bold flex flex-col items-center gap-2">
          {this.props.user ? (
            <>
              <h1>Chào mừng {this.props.user} quay trở lại 🥳</h1>
              <button className="text-red-500 flex gap-1 items-center" onClick={this.handleLogout}>
                <LogOutIcon size={16} />
                Đăng xuất
              </button>
            </>
          ) : (
            <h1>Bạn chưa đăng nhập Todo!!!</h1>
          )}
        </div>
        <form className="border-b pb-1.5 border-b-green-500" onSubmit={this.handleFormSubmit}>
          <input
            type="text"
            name="todo"
            placeholder="Thêm một việc làm mới"
            className="bg-transparent focus:outline-none p-1 mr-2"
          />
          <button
            className="bg-green-500 px-4 py-1.5 rounded-lg disabled:bg-opacity-50 disabled:cursor-not-allowed"
            disabled={this.state.isLoading}
          >
            Thêm mới
          </button>
        </form>
        <div className="flex w-full">
          {this.state.todos.length > 0 ? (
            <ul className="w-full flex flex-col gap-2">
              {this.state.todos.map((todo) => (
                <TodoItem key={todo._id} todo={todo} onDeleleSuccess={this.handleDeleteTodo} />
              ))}
            </ul>
          ) : (
            <p>Bạn chưa có todo nào!!! 😥</p>
          )}
        </div>
      </div>
    );
  }
}
