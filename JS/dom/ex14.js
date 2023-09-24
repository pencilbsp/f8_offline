var slider = document.querySelector(".slider");

// Định nghĩa xử kiện có tên finish

// var finishEvent = new Event("finish");

// slider.addEventListener("input", function () {
//   if (this.value == 100) {
//     slider.dispatchEvent(finishEvent);
//     finishEvent.test = "test";
//   }
// });

slider.addEventListener("over", function (e) {
  console.log(e);
  // console.log(this.data);
});
