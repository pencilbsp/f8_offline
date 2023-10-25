import { getSession, fetchWithAuth, handleLogout } from "./auth.js";
import {
  showLoading,
  setUser,
  postTemplace,
  formatDate,
  showPostLoading,
} from "./utils.js";
import { Picker } from "https://cdn.jsdelivr.net/npm/emoji-picker-element@^1/index.js";

const picker = new Picker();
Object.assign(picker.style, {
  position: "absolute",
  top: 0,
});

const style = document.createElement("style");
style.textContent = `
.picker {
  border-radius: 8px;
}
`;
picker.shadowRoot.appendChild(style);

let observer = null;
let datePicker = null;
let isPosting = false;
let isComposeModelOpen = false;
const p = { limit: 10, page: 1 };
const editorElm = document.getElementById("editor");
const userElm = document.getElementById("user-btn");
const scheduleElm = document.getElementById("schedule");
const placeholderElm = document.getElementById("placeholder");
const contentListElm = document.getElementById("content-list");
const dateInputElm = document.getElementById("date-picker-input");

function showContentLoading(isLoading = true) {
  const contentLoading = document.getElementById("content-loading");
  contentLoading.style.display = isLoading ? "flex" : "none";
}

function contentsBuilder(posts) {
  const articleElms = posts.map((post) => postTemplace(post));
  contentListElm.append(...articleElms);
}

async function getPosts() {
  showContentLoading();
  const params = new URLSearchParams(p);
  const response = await fetchWithAuth("/blogs?" + params.toString());
  const data = await response.json();
  const posts = data?.data || [];
  contentsBuilder(posts);
  showContentLoading(false);
}

async function postBlog(payload) {
  const response = await fetchWithAuth("/blogs", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();
  if (!response || response.status !== 200) {
    alert(data.message || "Đã xảy ra lỗi khi đăng bài viết");
    return null;
  }

  return data.data;
}

function emojiPick(event) {
  const { unicode } = event.detail;
  editorElm.textContent += unicode;
}

function hideEmojiPicker(event) {
  if (document.body.contains(picker) && event.target !== picker) {
    picker.removeEventListener("emoji-click", emojiPick);
    picker.remove();
    window.removeEventListener("click", hideEmojiPicker);
  }
}

function setSchedule(date) {
  scheduleElm.style.display = "flex";
  const dateString = formatDate(date, "dd/MM/yyyy");
  const timeElm = scheduleElm.querySelector("time");
  timeElm.textContent = dateString;
}

function clearSchedule() {
  scheduleElm.style.display = "none";
  timeElm.textContent = "";
  dateInputElm.value = "";
}

function toggleComposeModel() {
  isComposeModelOpen = !isComposeModelOpen;
  const composeModel = document.getElementById("compose-model");
  composeModel.style.display = isComposeModelOpen ? "flex" : "none";

  const focusEditor = () => editorElm.focus();

  const _observer =
    observer ||
    new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        //TODO: Detect enter key
        console.log(Boolean(mutation.target.textContent));
        if (mutation.target.textContent) {
          placeholderElm.style.display = "none";
        } else {
          placeholderElm.style.display = "inline-block";
        }
      });
    });

  !observer && (observer = _observer);

  const config = { attributes: true, childList: true, characterData: true };

  if (isComposeModelOpen) {
    focusEditor();
    _observer.observe(editorElm, config);
    placeholderElm.addEventListener("click", focusEditor);
  } else {
    _observer.disconnect();
    document.body.contains(picker) && picker.remove();
    placeholderElm.removeEventListener("click", focusEditor);
  }
}

window.addEventListener("scroll", async (event) => {
  if (isComposeModelOpen) {
    event.preventDefault();
    return;
  }

  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight
  ) {
    p.page += 1;
    await getPosts();
  }
});

document
  .getElementById("compose-tweet")
  .addEventListener("click", async function (event) {
    event.preventDefault();
    const isLogined = await getSession();
    if (isLogined) {
      toggleComposeModel();
    } else {
      window.location.replace(this.href + "?action=compose");
    }
  });

document
  .getElementById("compose-model-close")
  .addEventListener("click", function (event) {
    event.preventDefault();
    toggleComposeModel();
  });

document
  .getElementById("emoji-picker")
  .addEventListener("click", function (event) {
    event.stopPropagation();
    document.getElementById("tools-bar").append(picker);
    picker.addEventListener("emoji-click", emojiPick);
    window.addEventListener("click", hideEmojiPicker);
  });

document
  .getElementById("post-btn")
  .addEventListener("click", async function () {
    if (isPosting) return;

    isPosting = true;
    const schedule = dateInputElm.value;
    const content = editorElm.textContent;

    showPostLoading();
    const newPost = await postBlog({ content, title: "From X Reborn" });
    showPostLoading(false);

    if (newPost) {
      const newPostElm = postTemplace(newPost);
      contentListElm.prepend(newPostElm);
      editorElm.textContent = "";

      clearSchedule();
      toggleComposeModel();
    }

    isPosting = false;
  });

document.getElementById("date-picker").addEventListener("click", function () {
  const picker =
    datePicker ||
    datepicker("#date-picker-input", {
      alwaysShow: true,
      disabler: (date) => date < new Date(),
      onSelect: (instance) => {
        setSchedule(instance.dateSelected);
        picker.remove();
        datePicker = null;
      },
    });

  !datePicker && (datePicker = picker);
  Object.assign(picker.calendarContainer.style, {
    top: 0,
    left: 0,
  });
});

document.getElementById("user-btn").addEventListener("click", function (event) {
  event.preventDefault();
  const poperElm = this.children[0];
  const logOutElm = poperElm.children[0];
  const isPoperShow = poperElm.getAttribute("data-show") === "true";

  if (isPoperShow) {
    poperElm.style.display = "none";
    poperElm.setAttribute("data-show", false);
    logOutElm.removeEventListener("click", handleLogout);
  } else {
    poperElm.style.display = "flex";
    poperElm.setAttribute("data-show", true);
    logOutElm.addEventListener("click", handleLogout);
  }
});

(async () => {
  showLoading();
  const user = await getSession();
  setUser(user);
  showLoading(false);

  await getPosts();
})();
