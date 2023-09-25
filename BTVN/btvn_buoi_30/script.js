// Dropdown menu
var dropdownBtn = document.querySelector(".dropdown button");

window.addEventListener("click", function (event) {
  dropdownBtn.parentElement.classList.remove("open");
});

dropdownBtn.addEventListener("click", function (event) {
  event.stopPropagation();
  this.parentElement.classList.toggle("open");
});

var titleInput = document.getElementById("file-name");
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

function newFile() {
  titleInput.value = "Untitled";
  editorContent.innerHTML = "";
  editorContent.focus();
}

function saveToTxt() {
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";

  var text = editorContent.textContent;
  var blob = new Blob([text], { type: "text/plaint" });
  var url = window.URL.createObjectURL(blob);

  a.href = url;
  a.download = titleInput.value + ".txt";
  a.click();
  window.URL.revokeObjectURL(url);
}

function saveToPdf() {
  var opt = {
    margin: 1,
    filename: titleInput.value + ".pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };
  html2pdf().set(opt).from(editorContent).save();
}
