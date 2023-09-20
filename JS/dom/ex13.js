var audio = new Audio("../../assets/YVVRemix.mp3");
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

var interval;

audio.addEventListener("pause", function () {
  player.classList.remove("playing");
  player.classList.add("paused");

  if (interval) clearInterval(interval);
});

audio.addEventListener("play", function () {
  player.classList.remove("paused");
  player.classList.add("playing");
  interval = setInterval(() => {
    handleKaraoke();
  }, 10);
});

// KARAOKE
var karaokePlay = document.querySelector(".karaoke-play");
var karaokeClose = document.querySelector(".karaoke-close");
var karaokeInner = document.querySelector(".karaoke-inner");
var karaokeContent = document.querySelector(".karaoke-content");

karaokePlay.addEventListener("click", function () {
  player.classList.toggle("show");
  karaokeInner.classList.toggle("show");
});

karaokeClose.addEventListener("click", function () {
  player.classList.toggle("show");
  karaokeInner.classList.toggle("show");
});

var sentences = [null, null];

function handleKaraoke() {
  var currentTime = audio.currentTime * 1000;
  var index = lyric.findIndex(function (lyricItem) {
    return (
      currentTime >= lyricItem.words[0].startTime && currentTime <= lyricItem.words[lyricItem.words.length - 1].endTime
    );
  });

  function getWords(index) {
    return lyric[index].words
      .map(function (word) {
        return `<span class="word">${word.data}<span>${word.data}</span></span>`;
      })
      .join(" ");
  }

  function changeSentence(elm, sentence, index) {
    elm.style.transition = "all 300ms ease";
    elm.style.opacity = 0;

    setTimeout(() => {
      elm.innerHTML = sentence;
      elm.style.opacity = 1;
      elm.dataset.index = index;
    }, 300);
  }

  if (index > -1) {
    // if (sentences[1] === index) {
    //   sentences = [index + 1, index];
    // } else {
    //   sentences = [index, index + 1];
    // }

    if (index === 0) {
      var outHTML = `
      <p data-index=${index}>${getWords(0)}</p>
      <p data-index=${index + 1}>${getWords(1)}</p>`;
      karaokeContent.innerHTML = outHTML;
    } else {
      if (index % 2 !== 0) {
        changeSentence(karaokeContent.children[0], getWords(index + 1), index);
      } else {
        changeSentence(karaokeContent.children[1], getWords(index + 1), index + 1);
      }
    }
  }
}
