var backToTopElm = document.getElementById("back-to-top");

backToTopElm.addEventListener("click", function () {
  window.scroll(0, 0);
});

if (window.scrollY > 100) {
  backToTopElm.classList.add("show");
}

window.addEventListener("scroll", function (event) {
  if (window.scrollY > 100) {
    backToTopElm.classList.add("show");
  } else {
    backToTopElm.classList.remove("show");
  }
});
