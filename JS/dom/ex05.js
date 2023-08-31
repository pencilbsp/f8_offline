// const btnElm = document.querySelector(".btn");
// const contentElm = document.querySelector(".content");

// btnElm.addEventListener("click", function (event) {
//   contentElm.innerHTML = `<button>Xoá</button>`;
// });

// contentElm.addEventListener("click", function (event) {
//   event.target.remove();
// });

document.addEventListener("contextmenu", function (event) {
  event.preventDefault();
  document.getElementById("menu").style.display = "inline-block";
});

document.addEventListener("click", function (event) {
  const menu = document.getElementById("menu");
  menu.style.display = "none";
  if (event.target.contains(menu)) {
    
  }
});
