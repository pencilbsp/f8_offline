// Dropdown menu
var dropdownBtn = document.querySelector(".dropdown button");

dropdownBtn.addEventListener("click", function () {
  this.parentElement.classList.toggle("open");
});

dropdownBtn.addEventListener("blur", function () {
  this.parentElement.classList.remove("open");
});

var editorContent = document.getElementById("content");
var actionBtnElms = document.querySelectorAll(".actions button");
var actionInputElms = document.querySelectorAll(".actions input");

actionBtnElms.forEach(function (actionElm) {
  actionElm.addEventListener("click", function () {
    document.execCommand(actionElm.id, false, null);
  });
});

actionInputElms.forEach(function (actionElm) {
  actionElm.addEventListener("change", function () {
    document.execCommand(actionElm.id, false, actionElm.value);
  });
});
