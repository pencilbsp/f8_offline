var isFormModified = false;
var form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("form");
});

form.addEventListener("input", function (event) {
  if (!isFormModified) isFormModified = true;
});

window.addEventListener("beforeunload", function (event) {
  if (isFormModified) event.returnValue = "";
});
