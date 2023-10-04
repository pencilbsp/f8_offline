const resultElm = document.getElementById("result");
const buttonElm = document.getElementById("button");
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognization = new SpeechRecognition();

// recognization.continuous = true;
// recognization.interimResults = true;
recognization.lang = "vi-VN";

recognization.onstart = () => {
  console.log("Listening...");
};

recognization.onresult = (event) => {
  let result = true;
  const text = event.results[0][0].transcript.toLowerCase();
  console.log(text);

  setTimeout(() => {
    switch (text) {
      case "google":
        window.open("https://google.com");
        break;

      case "youtube":
        window.open("https://youtube.com");
        break;

      case "facebook":
        window.open("https://facebook.com");
        break;

      case "google drive":
        window.open("https://drive.google.com");
        break;

      case "google maps":
      case "bản đồ":
      case "maps":
        window.open("https://maps.google.com");
        break;

      default:
        if (text.includes("chỉ đường") || text.includes("đường tới") || text.includes("tới")) {
          let url = "https://www.google.com/maps/search/".concat(
            text.replace("chỉ đường", "").replace("tới", "").replace("đường", "").trim()
          );
          window.open(url.trim());
        } else if (text.includes("bài hát") || text.includes("mở bài hát") || text.includes("nghe bài hát")) {
          let url = "https://zingmp3.vn/tim-kiem/tat-ca?q=".concat(
            text.replace("bài hát", "").replace("mở", "").replace("nghe", "").trim()
          );
          window.open(url.trim());
        } else if (text.includes("video") || e.includes("mở video") || e.includes("xem video")) {
          let url = "https://www.youtube.com/results?search_query=".concat(
            text.replace("video", "").replace("mở", "").replace("xem", "").trim()
          );
          window.open(url.trim());
        } else {
          result = false;
        }
        break;
    }

    recognization.stop();
    buttonElm.classList.remove("listening");
    resultElm.style.display = result ? "block" : "none";
  }, 500);
};

buttonElm.addEventListener("click", function () {
  if (this.classList.contains("listening")) {
    this.classList.remove("listening");
    recognization.stop();
  } else {
    this.classList.add("listening");
    recognization.start();
  }
});
