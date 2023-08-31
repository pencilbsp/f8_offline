var btnElm = document.getElementById("btn");

var mousePress = false;
var offsetX = 0;
var offsetY = 0;

/**
 *
 * @param {MouseEvent} event
 */
function move(event) {
  if (mousePress) {
    /**
     * @type {CSSStyleDeclaration}
     */
    var css = {
      position: "relative",
      top: `${event.clientY - offsetY}px`,
      left: `${event.clientX - offsetX}px`,
    };

    Object.assign(btnElm.style, css);
  }
}

btnElm.addEventListener("mousedown", function (event) {
  mousePress = true;
  offsetX = event.offsetX;
  offsetY = event.offsetX;
});

document.addEventListener("mouseup", function (event) {
  mousePress = false;
});

document.addEventListener("mousemove", move);
// document.addEventListener("click", function (event) {
//   const orifinX = btnElm.offsetWidth - (btnElm.offsetLeft + btnElm.offsetWidth - event.clientX);
//   const orifinY = btnElm.offsetHeight - (btnElm.offsetTop + btnElm.offsetHeight - event.clientY);
//   console.log({ orifinX, orifinY });
// });

document.ad;
