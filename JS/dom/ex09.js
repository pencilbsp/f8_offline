var carouselElm = document.querySelector(".carousel");
var carouselInnerElm = carouselElm.querySelector(".carousel-inner");

var prevElm = carouselElm.querySelector(".prev");
var nextElm = carouselElm.querySelector(".next");

var itemWidth = carouselInnerElm.offsetWidth;
var itemElms = carouselInnerElm.querySelectorAll(".item").length;

var totalWidth = itemWidth * itemElms;

carouselInnerElm.style.width = totalWidth + "px";

function getTranslateX(e) {
  const style = window.getComputedStyle(e);
  const matrix = new WebKitCSSMatrix(style.transform);
  return matrix.m41;
}

nextElm.addEventListener("click", function () {
  var currentTranslateX = getTranslateX(carouselElm.querySelector(".carousel-inner"));
  var translateX = currentTranslateX - itemWidth;
  if (Math.abs(translateX) === totalWidth) translateX = 0;

  carouselInnerElm.style.transform = `translateX(${translateX}px)`;
});

prevElm.addEventListener("click", function () {
  var currentTranslateX = getTranslateX(carouselElm.querySelector(".carousel-inner"));
  var translateX = currentTranslateX + itemWidth;
  // console.log(translateX, 0 - totalWidth - itemWidth)
  if (translateX > 0) {
    translateX = 0 - (totalWidth - itemWidth);
  }

  carouselInnerElm.style.transform = `translateX(${translateX}px)`;
});
