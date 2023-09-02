// var btnElm = document.querySelector(".btn")

// console.log(btnElm);
// console.log(btnElm.parentElement);

var removeBtnList = document.querySelectorAll(".remove");
removeBtnList.forEach(function (removeBtn) {
  removeBtn.addEventListener("click", function (event) {
    this.parentElement.remove();
  });
});

var menu = document.querySelector(".menu");
for (const menuItem of menu.children) {
  if (menuItem.children.length > 1) {
    menuItem.classList.add("has-children")
  }
}
// menu.children
// console.log(menu.children[1].children[1].children[0].textContent);
