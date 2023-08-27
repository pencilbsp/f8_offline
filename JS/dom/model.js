var btnElm = document.getElementById("model-btn")
var overlayElm = document.getElementById("model-overlay")
var modelElm = document.getElementById("model")
var modelCloseElm = document.getElementById("model-close")

btnElm.addEventListener("click", function () {
    modelElm.classList.remove("hidden")
    overlayElm.classList.remove("hidden")
})

modelCloseElm.addEventListener("click", function () {
    modelElm.classList.add("hidden")
    overlayElm.classList.add("hidden")
})