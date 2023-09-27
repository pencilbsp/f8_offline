let stopTime = 0;
let requestId = null;
let startTime = Date.now();
const WAIT_TIME = 30000;

window.addEventListener("blur", function () {
  stopTime = Date.now();
  requestId && window.cancelAnimationFrame(requestId);
});

window.addEventListener("focus", function () {
  if (stopTime > 0) {
    const diffTime = Date.now() - stopTime;
    startTime = startTime + diffTime;
  }
});

function counter() {
  const diffTime = Date.now() - startTime;
  if (diffTime >= WAIT_TIME) {
    window.cancelAnimationFrame(requestId);

    const getLinkBtn = document.getElementById("get-link");
    getLinkBtn.disabled = false;
    getLinkBtn.addEventListener("click", function () {
      window.location.href = "https://fullstack-nodejs.fullstack.edu.vn/";
    });

    request = null;
  } else {
    document.getElementById("counter").textContent = ((WAIT_TIME - diffTime) / 1000).toFixed();
    request = window.requestAnimationFrame(counter);
  }
}

request = window.requestAnimationFrame(counter);
