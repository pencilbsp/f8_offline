var header = document.querySelector(".header");
var headerInner = header.querySelector(".header-inner");
var menu = header.querySelector(".menu");

var headerInnerHeight = headerInner.clientHeight;
var menuHeight = menu.clientHeight;

window.addEventListener("scroll", function () {
  var y = window.scrollY;
  if (y >= headerInnerHeight) {
    menu.classList.add("fixed");
    document.body.style.paddingTop = menuHeight + "px";
  } else {
    menu.classList.remove("fixed");
    document.body.style.paddingTop = 0;
  }
});
