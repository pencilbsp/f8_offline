const from = document.querySelector("form");
import { handleLogin, getSession } from "./auth.js";
import { showLoading } from "./utils.js";

function showAuthLoading(isSubmiting = true) {
  const submitBtn = document.getElementById("submit-btn");
  const loadingIcon = submitBtn.querySelector("svg");
  if (isSubmiting) {
    submitBtn.setAttribute("disabled", true);
    loadingIcon.style.display = "block";
  } else {
    submitBtn.removeAttribute("disabled");
    loadingIcon.style.display = "none";
  }
}

from.addEventListener("submit", async function (event) {
  event.preventDefault();
  const formData = new FormData(this);
  const email = formData.get("email");
  const password = formData.get("password");

  showAuthLoading();
  const isSuccess = await handleLogin({ email, password });
  showAuthLoading(false);

  if (isSuccess) window.location.replace("index.html");
});

(async () => {
  showLoading();
  const isLogined = await getSession();
  if (isLogined) window.location.replace("index.html");

  showLoading(false);
})();
