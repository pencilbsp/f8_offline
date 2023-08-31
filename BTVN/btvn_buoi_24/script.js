const todoForm = document.getElementById("todo-form");
const todoListElm = document.getElementById("todo-list");

function createTodoElm(todo) {
  const todoItemElm = document.createElement("div");
  todoItemElm.classList.add(...["item"]);

  // Edit box
  const todoEditElm = document.createElement("input");
  todoEditElm.value = todo.text;
  todoEditElm.readOnly = "true";
  todoEditElm.addEventListener("click", function () {
    if (!todoItemElm.classList.contains("editing")) {
      this.classList.toggle("complete");
    }
  });
  todoEditElm.addEventListener("blur", function () {
    this.readOnly = "true";
    todoItemElm.classList.remove("editing");
    if (this.dataset?.callback === "complete") {
      this.classList.add("complete");
      this.dataset.callback = "";
    }
  });

  // Trash action
  const trashBtnElm = document.createElement("button");
  trashBtnElm.innerHTML = '<i class="fa-solid fa-trash"></i>';
  trashBtnElm.addEventListener("click", function () {
    todoItemElm.remove();
  });

  // Edit action
  const editBtnElm = document.createElement("button");
  editBtnElm.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
  editBtnElm.addEventListener("click", function () {
    todoItemElm.classList.add("editing");
    todoEditElm.removeAttribute("readOnly");
    todoEditElm.focus();
    if (todoEditElm.classList.contains("complete")) {
      todoEditElm.classList.remove("complete");
      todoEditElm.dataset.callback = "complete";
    }
  });

  // Update action
  const updateBtnElm = document.createElement("button");
  updateBtnElm.innerHTML = '<i class="fa-solid fa-check"></i>';
  updateBtnElm.classList.add("update-btn");

  const todoActionsElm = document.createElement("div");
  todoActionsElm.classList.add("actions");
  todoActionsElm.append(editBtnElm, trashBtnElm, updateBtnElm);

  todoItemElm.append(todoEditElm, todoActionsElm);

  return todoItemElm;
}

todoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(this);

  const value = formData.get("text").trim();
  if (value !== "") {
    const todoItemElm = createTodoElm({ done: false, text: value });
    todoListElm.append(todoItemElm);
    this.reset();
  }
});
