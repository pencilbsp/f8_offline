const TodoMap = new Map();

const todoList = document.getElementById("todo-list");
const todoModel = document.getElementById("todo-model");
const finishedTodos = document.getElementById("finished-todos");

const todoFrom = todoModel.querySelector("form");
const inputTodo = todoFrom.querySelector("input");
const showModelBtn = document.getElementById("show-model-btn");
const editingView = document.querySelector("input[type='search']");
const cancelModelBtn = todoModel.querySelector("button[type='button']");

const hideModel = () => todoModel.classList.remove("active");
const showModel = () => (todoModel.classList.add("active"), inputTodo.focus());

finishedTodos.addEventListener("click", function () {
  finishedTodos.classList.toggle("active");
  render();
});

showModelBtn.addEventListener("click", showModel);
cancelModelBtn.addEventListener("click", hideModel);

editingView.addEventListener("input", function () {
  render(this.value);
});

todoFrom.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(this);
  const todoContent = formData.get("todo");
  const editTodoId = this.dataset.edit;

  if (editTodoId) {
    const todoItem = TodoItem.findById(+editTodoId);
    todoItem.changeContent(todoContent);
    this.removeAttribute("data-edit");
    inputTodo.value = "";
  } else {
    new TodoItem(todoContent);
  }

  this.reset();
  hideModel();
  render();
});

class TodoItem {
  constructor(content) {
    this.finish = false;
    this.id = Date.now();

    const todoBox = document.createElement("div");
    todoBox.dataset.id = this.id;
    todoBox.classList.add("todo-item");

    this.todoContent = document.createElement("span");
    this.todoContent.textContent = content;

    const todoActionWrap = document.createElement("div");
    this.deleteAction = this.createButton("delete");

    this.editAction = this.createButton("edit");
    this.finishAction = this.createButton("check");

    todoActionWrap.append(this.deleteAction, this.editAction, this.finishAction);
    todoBox.append(this.todoContent);
    todoBox.append(todoActionWrap);

    this.root = todoBox;
    TodoMap.set(this.id, this);

    this.deleteAction.addEventListener("click", () => {
      this.root.remove();
      TodoMap.delete(this.id);
      updateFinishTodoCount();
    });

    this.editAction.addEventListener("click", () => {
      todoFrom.dataset["edit"] = this.id;
      inputTodo.value = this.todoContent.textContent;
      showModel();
    });

    this.finishAction.addEventListener("click", () => {
      this.finish = !this.finish;
      this.finishAction.classList.toggle("finished");
      this.root.remove();
      render();
    });
  }

  createButton(iconName) {
    const btn = document.createElement("button");
    const icon = document.createElement("img");
    icon.src = `icons/${iconName}.svg`;
    icon.alt = `${iconName}-icon`;

    btn.classList.add(iconName);
    btn.append(icon);
    return btn;
  }

  changeContent(content) {
    this.todoContent.textContent = content;
  }

  static findById(id) {
    return TodoMap.get(id);
  }
}

function updateFinishTodoCount(TodoArray) {
  const finishTodoCount = (TodoArray || getQueryResult()).filter((e) => e[1].finish).length;
  document.getElementById("todo-finish-count").textContent = finishTodoCount;
}

function getQueryResult(query = editingView.value) {
  if (typeof query === "string" && query !== "") query = query.toLowerCase();
  return Array.from(TodoMap).filter((item) => {
    const todo = item[1];
    let isFoundTodo = true;
    if (query && !todo.todoContent.textContent.toLowerCase().includes(query)) isFoundTodo = false;
    if (!isFoundTodo) todo.root.remove();
    return isFoundTodo;
  });
}

function render(query) {
  const isShowFinishTodo = finishedTodos.classList.contains("active");
  const TodoArray = getQueryResult(query);

  TodoArray.forEach((item) => {
    const todo = item[1];
    if (!todoList.contains(todo.root) && !todo.finish) {
      todoList.children[0].append(todo.root);
    }

    if (todo.finish && isShowFinishTodo) {
      todoList.children[2].append(todo.root);
    }

    if (todo.finish && !isShowFinishTodo) {
      todo.root.remove();
    }
  });

  updateFinishTodoCount(TodoArray);
}
