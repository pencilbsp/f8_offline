const carouselElm = document.querySelector(".carousel");
const innerElm = carouselElm.querySelector(".carousel-inner");
const dotsElm = carouselElm.querySelector(".carousel-dots");
const navElm = carouselElm.querySelector(".carousel-nav");
const nextElm = document.getElementById("next");
const prevElm = document.getElementById("prev");

let active = 0;
let prevClientX;
let prevTranslateX;
let updated = false;
let isDragging = false;
const imageCount = innerElm.children.length;

function render() {
  const width = carouselElm.offsetWidth;
  innerElm.children[active].classList.add("active");
  innerElm.style.width = imageCount * width + "px";
  innerElm.style.transform = `translateX(${active * -width}px)`;

  const dotElmList =
    dotsElm.children.length === 0
      ? (function () {
          const elms = Array.from({ length: imageCount }, function (_, i) {
            const dotELm = document.createElement("span");
            dotELm.addEventListener("click", function (event) {
              active = Number(event.target.dataset.index);
              render();
            });
            dotELm.dataset.index = i;
            return dotELm;
          });
          dotsElm.append(...elms);
          return elms;
        })()
      : Array.from(dotsElm.children);

  dotElmList.forEach(function (dotELm) {
    const index = Number(dotELm.dataset.index);
    if (index === active) {
      dotELm.classList.add("active");
    } else {
      dotELm.classList.remove("active");
    }
  });
}

function update(_, isNext) {
  isNext = typeof isNext !== "undefined" ? isNext : this.id.includes("next");

  active += isNext ? 1 : -1;
  if (active === imageCount) active = 0;
  if (active < 0) active = imageCount - 1;

  render();
}

function startDrag(event) {
  isDragging = true;
  prevClientX = event.clientX;
  prevTranslateX = active * -carouselElm.offsetWidth;
}

function dragging(event) {
  event.preventDefault();
  if (!isDragging) return;

  const translateXDiff = prevClientX - event.clientX;
  innerElm.style.transform = `translateX(${prevTranslateX - translateXDiff}px)`;

  if (Math.abs(translateXDiff) > 150) {
    updated = true;
    isDragging = false;
    update(null, translateXDiff > 0);
  }
}

function stopDrag() {
  isDragging = false;
  if (!updated) innerElm.style.transform = `translateX(${prevTranslateX}px)`;
  updated = false;
}

render();

window.addEventListener("resize", render);
nextElm.addEventListener("click", update);
prevElm.addEventListener("click", update);
innerElm.addEventListener("mousedown", startDrag);
innerElm.addEventListener("mousemove", dragging);
innerElm.addEventListener("mouseup", stopDrag);
