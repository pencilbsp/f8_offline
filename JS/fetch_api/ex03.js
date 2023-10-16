/**
 * 1. Authentication
 *
 * Các loại authentication
 *
 *
 * 2. Authoriztion
 */

const baseApiUrl = "https://api.escuelajs.co/api";

const app = {
  isLogin: async function () {
    const user = await this.getProfile();
    return Boolean(user);
  },

  getLocalToken: function () {
    let tokens = {};
    const tokenString = localStorage.getItem("login_tokens");
    if (tokenString) {
      try {
        tokens = JSON.parse(tokenString);
      } catch (error) {
        console.log(error);
      }
    }
    return tokens;
  },

  getProfile: async function () {
    const { access_token: accessToken } = this.getLocalToken();
    console.log(accessToken);
    const response = await fetch(baseApiUrl + "/v1/auth/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }

    return null;
  },

  handleLogout: function () {
    document.getElementById("logout").addEventListener("click", (event) => {
      event.preventDefault();
      console.log("Logout");
      localStorage.removeItem("login_tokens");
      this.render();
    });
  },

  handleLogin: async function (email, password) {
    this.showLoading();
    const response = await fetch(baseApiUrl + "/v1/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "content-type": "application/json" },
    });

    const data = await response.json();
    if (!response.ok) {
      alert(data.message);
    } else {
      localStorage.setItem("login_tokens", JSON.stringify(data));
      this.render();
    }

    this.showLoading(false);
  },

  showLoading: function (show = true) {
    document.querySelector(".spinner-border").classList[show ? "remove" : "add"]("d-none");
    !show && document.querySelector('button[type="submit"]').removeAttribute("disabled");
    show && document.querySelector('button[type="submit"]').setAttribute("disabled", true);
  },

  eventLogin: function () {
    const form = document.getElementById("login-from");
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const email = formData.get("email");
      const password = formData.get("password");
      this.handleLogin(email, password);
    });
  },

  render: async function () {
    const root = document.getElementById("root");
    const user = await this.getProfile();

    if (user) {
      root.innerHTML = `<div class="container py-3">
        <h2 class="text-center">Chào mừng bạn đã quay trở lại</h2>
        <hr />
        <ul class="list-unstyled d-flex gap-3">
          <li>Chào bạn: <b>${user.name}</b></li>
          <li><a id="logout" href="#">Đăng xuất</a></li>
        </ul>
      </div>`;
      this.handleLogout();
    } else {
      root.innerHTML = `<div class="container py-3">
      <div class="row justify-content-center">
        <div class="col-7">
          <h2 class="text-center">Đăng nhập</h2>
          <form id="login-from" action="">
            <div class="mb-3">
              <label for="">Email</label>
              <input type="email" name="email" class="form-control email" placeholder="Email..." />
            </div>
            <div class="mb-3">
              <label for="">Mật khẩu</label>
              <input type="password" name="password" class="form-control password" placeholder="Mật khẩu..." />
            </div>
            <div class="d-grid">
              <button type="submit" class="btn btn-primary">
                <span class="d-none spinner-border spinner-border-sm" role="status"></span>
                Đăng nhập
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>`;
      this.eventLogin();
    }
  },
};

app.render();
