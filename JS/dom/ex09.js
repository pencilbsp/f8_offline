// window.addEventListener("DOMContentLoaded", function () {
//   var img = document.querySelector("img");
//   console.log(img.width);
// });

window.addEventListener("load", function () {
  var loadingElm = document.getElementById("loading");
  loadingElm.remove();
  var img = document.querySelector("img");
  console.log(img.width);
});
