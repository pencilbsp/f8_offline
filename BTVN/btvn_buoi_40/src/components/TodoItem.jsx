/* eslint-disable react/prop-types */
import { toast } from "sonner";
import React, { Component } from "react";
import { Trash2Icon, FileEditIcon, CheckCheckIcon, XIcon } from "lucide-react";

import cn from "../utils/cn";
import request from "../utils/request";

export default class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.editRef = React.createRef();
    this.deletePending = false;
    this.state = {
      editMode: false,
      isLoading: false,
      todo: this.props.todo.todo,
      isCompleted: this.props.todo.isCompleted,
    };
  }

  editModeToggle = () => {
    this.setState({ editMode: !this.state.editMode });
    this.editRef.current && !this.state.editMode && this.editRef.current.focus();
  };

  handleExitEditMode = () => {
    const currentTodo = this.editRef.current.value;
    if (currentTodo !== this.state.todo) {
      this.editRef.current.value = this.state.todo;
    }

    if (this.state.isCompleted !== this.props.todo.isCompleted) {
      this.setState({ isCompleted: this.props.todo.isCompleted });
    }

    this.editModeToggle();
  };

  deleteTodo = async (id) => {
    this.setState({ isLoading: true });
    const response = await request.http(`/todos/${id}`, { method: "DELETE" });
    const data = await response.json();
    if (data.code !== 200) throw new Error(data.message);
    this.props.onDeleleSuccess(id);
    this.setState({ isLoading: false });
    return data.message;
  };

  updateTodo = async (event) => {
    this.setState({ isLoading: true });
    event.preventDefault();
    const formData = new FormData(event.target);
    const todo = formData.get("todo");
    const isCompleted = this.state.isCompleted;
    if (todo === this.props.todo.todo && isCompleted === this.props.todo.isCompleted)
      throw new Error("Không có thay đổi gì 🧐");

    const response = await request.http(`/todos/${this.props.todo._id}`, {
      method: "PATCH",
      body: { todo, isCompleted },
    });

    const data = await response.json();
    if (data.code !== 200) throw new Error(data.message);
    this.editModeToggle();
    this.setState({ isLoading: false, todo, isCompleted });
    return data.message;
  };

  handleUpdateTodo = (event) => {
    toast.promise(() => this.updateTodo(event), {
      loading: "Đang cập nhật todo...",
      success: (message) => message,
      error: (error) => {
        this.setState({ isLoading: false });
        return error.message;
      },
    });
  };

  handleDeleteTodo = (id) => {
    if (this.deletePending) return;

    this.deletePending = true;
    toast.warning("Bạn chắc chắn muốn xoá todo này?", {
      action: {
        label: "Xoá",
        onClick: () =>
          toast.promise(() => this.deleteTodo(id), {
            loading: "Đang xoá todo...",
            success: (message) => message,
            error: (error) => {
              this.setState({ isLoading: false });
              return error.message;
            },
          }),
      },
      cancel: {
        label: "Huỷ",
        onClick: () => (this.deletePending = false),
      },
      onDismiss: () => (this.deletePending = false),
      onAutoClose: () => (this.deletePending = false),
    });
  };

  render() {
    return (
      <li className="rounded-lg shadow-lg bg-slate-700">
        <form className="flex flex-col px-4 py-2 gap-2" onSubmit={this.handleUpdateTodo}>
          <input
            name="todo"
            ref={this.editRef}
            readOnly={!this.state.editMode}
            defaultValue={this.props.todo.todo}
            className={cn(
              "bg-transparent border-b-transparent focus:outline-none pb-1 border-b-[1px] w-full",
              this.state.editMode && "border-b-gray-500",
              this.state.isCompleted && "line-through"
            )}
          />
          <div className="flex w-full justify-between gap-4">
            <label className={cn("flex items-center text-gray-400", !this.state.editMode && "hidden")}>
              <input
                type="checkbox"
                name="isCompleted"
                checked={this.state.isCompleted}
                onChange={(e) => this.setState({ isCompleted: e.target.checked })}
              />
              <span className="ml-2">Đã hoàn thành</span>
            </label>
            <div className="flex gap-4 ml-auto">
              {this.state.editMode ? (
                <>
                  <button
                    type="button"
                    disabled={this.state.isLoading}
                    className={cn("text-green-500 flex items-center disabled:opacity-50 disabled:cursor-not-allowed")}
                    onClick={this.handleExitEditMode}
                  >
                    <XIcon size={16} className="mr-1" />
                    Thoát
                  </button>
                  <button
                    type="submit"
                    disabled={this.state.isLoading}
                    className={cn("text-orange-500 flex items-center disabled:opacity-50 disabled:cursor-not-allowed")}
                    // onClick={this.editModeToggle}
                  >
                    <CheckCheckIcon size={16} className="mr-1" />
                    Cập nhật
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={this.editModeToggle}
                  disabled={this.state.isLoading}
                  className={cn("text-blue-500 flex items-center disabled:opacity-50 disabled:cursor-not-allowed")}
                >
                  <FileEditIcon size={16} className="mr-1" />
                  Sửa
                </button>
              )}

              <button
                type="button"
                disabled={this.state.isLoading}
                onClick={() => this.handleDeleteTodo(this.props.todo._id)}
                className="text-red-500 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trash2Icon size={16} className="mr-1" />
                Xoá
              </button>
            </div>
          </div>
        </form>
      </li>
    );
  }
}
