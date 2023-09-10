var audio = new Audio("../../assets/NMELC.m4a");
var player = document.querySelector(".player");
var playBtn = document.querySelector(".play-btn");
var progressBar = document.querySelector(".progress-bar");
var progress = progressBar.querySelector(".progress");
var progressSpan = progress.children[0];
var timeLeft = progressBar.nextElementSibling;
var timeRight = progressBar.previousElementSibling;
var isSeeking = false;

function updateProgress(percent, seeking = false) {
  if (percent < 0) {
    percent = 0;
  }
  if (percent > 100) {
    percent = 100;
  }
  if (seeking) {
    audio.currentTime = Math.floor((audio.duration / 100) * percent);
  }
  progress.style.width = `${percent}%`;
}

function dragging() {
  var flag = true;
  isSeeking = true;
  function moveAt(event, seeking) {
    var bounding = progressBar.getBoundingClientRect();
    var diffOffetX = event.clientX - bounding.left;
    updateProgress((diffOffetX / progressBar.clientWidth) * 100, seeking);
  }

  document.addEventListener("mouseup", function (event) {
    flag && moveAt(event, flag);
    flag = false;
    isSeeking = false;
    document.removeEventListener("mousemove", moveAt);
  });

  document.addEventListener("mousemove", moveAt);
}

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

function updateTime(currentTime, totalTime) {
  timeLeft.textContent = millisToMinutesAndSeconds(totalTime);
  timeRight.textContent = millisToMinutesAndSeconds(currentTime);
  !isSeeking && updateProgress((currentTime / totalTime) * 100);
}

progressBar.addEventListener("mousedown", function (event) {
  if (event.which === 1) {
    var percent = (event.offsetX / progressBar.clientWidth) * 100;
    updateProgress(percent, true);
  }
});

progressSpan.addEventListener("mousedown", function (event) {
  event.stopPropagation();
  dragging();
});

playBtn.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

audio.addEventListener("loadeddata", function () {
  updateTime(0, audio.duration * 1000);
  player.classList.add("paused");
});

audio.addEventListener("timeupdate", function () {
  updateTime(audio.currentTime * 1000, audio.duration * 1000);
});

audio.addEventListener("pause", function () {
  player.classList.remove("playing");
  player.classList.add("paused");
});

audio.addEventListener("play", function () {
  player.classList.remove("paused");
  player.classList.add("playing");
});
