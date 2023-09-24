// Trigger event
// var btn = document.querySelector("button");

// btn.addEventListener("click", function (event) {
//   console.log("click");
// });

// var time = Date.now();
// var interval = setInterval(() => {
//   btn.click();

//   if (Date.now() - time > 10000) {
//     clearInterval(interval);
//   }
// }, 1000);

var quantityInput = document.querySelector(".quantity input");
var minusBtn = quantityInput.previousElementSibling;
var plusBtn = quantityInput.nextElementSibling;

var changeEvent = new Event("change");
quantityInput.addEventListener("change", function () {
  console.log(this.value);
});

minusBtn.addEventListener("click", function () {
  quantityInput.value--;
  quantityInput.dispatchEvent(changeEvent);
});

plusBtn.addEventListener("click", function () {
  quantityInput.value++;
  quantityInput.dispatchEvent(changeEvent);
});

var province = document.getElementById("province");
province.addEventListener("change", function () {
  var provinceId = this.value;
  console.log(provinceId);
});

var selectChangeEvent = new Event("change");
province.dispatchEvent(selectChangeEvent);
