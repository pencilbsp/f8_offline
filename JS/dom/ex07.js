var products = document.querySelector(".products");

function handleNext() {
  var activeProduct = products.querySelector(".active");
  activeProduct.classList.toggle("active");

  var nextElm = activeProduct?.nextElementSibling || products.children[0];
  nextElm.classList.toggle("active");
}

function handlePrev() {
  var activeProduct = products.querySelector(".active");
  activeProduct.classList.toggle("active");

  var prevElm = activeProduct.previousElementSibling || products.children[products.childElementCount - 1];
  prevElm.classList.toggle("active");
}

document.addEventListener("keyup", function (event) {
  if (event.keyCode === 37) {
    handlePrev()
  }
  if (event.keyCode === 39) {
    handleNext()
  }
})

document.getElementById("prev").addEventListener("click", handlePrev);

document.getElementById("next").addEventListener("click", handleNext);
