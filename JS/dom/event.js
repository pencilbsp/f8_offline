var rangeInputs = document.querySelectorAll("input[type=range]");

var overEvent = new Event("over");

if (rangeInputs.length) {
  rangeInputs.forEach(function (elm) {
    elm.addEventListener("mousemove", function (event) {
      var value = (event.offsetX * 100) / this.clientWidth;
      value = value.toFixed(2);
      this.dispatchEvent(overEvent);
      this.data = value;

      overEvent.offsetX = event.offsetX;
      overEvent.offsetY = event.offsetY;
    });
  });
}
