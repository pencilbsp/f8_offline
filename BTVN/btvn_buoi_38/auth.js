let refreshTokenPromise = null;
const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const BASE_API_URL = "https://api-auth-two.vercel.app";

export function checkTokenExpired(token) {
  if (!token) return false;
  const dataEncoded = token.split(".")[1];

  if (dataEncoded) {
    const tokenPayload = JSON.parse(atob(dataEncoded));
    return Date.now() > tokenPayload.exp * 1000;
  } else {
    return false;
  }
}

export function clearToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function setToken({ accessToken, refreshToken }) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function getToken() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  if (checkTokenExpired(accessToken)) return handleRefreshToken(refreshToken);

  return { accessToken, refreshToken };
}

export function handleRefreshToken(refreshToken) {
  if (!refreshTokenPromise)
    refreshTokenPromise = new Promise(async (resolve) => {
      if (!checkTokenExpired(refreshToken)) {
        try {
          const response = await fetch(`${BASE_API_URL}/auth/refresh-token`, {
            method: "POST",
            body: JSON.stringify({ refreshToken }),
            headers: { "Content-Type": "application/json" },
          });

          if (!response.ok || response.status !== 200)
            throw new Error("Làm mới mã truy cập không thành công.");

          const data = await response.json();
          refreshTokenPromise = null;
          setToken(data.data.token);
          return resolve(data.data.token);
        } catch (error) {
          clearToken();
          refreshTokenPromise = null;
          console.log("refreshToken Error:", error.message);
          return resolve({});
        }
      } else {
        clearToken();
        // refreshTokenPromise = null;
        return resolve({});
      }
    });

  console.log(refreshTokenPromise);
  return refreshTokenPromise;
}

export async function fetchWithAuth(url, options = {}) {
  if (!url.startsWith("http")) {
    url = BASE_API_URL + url;
  }

  const headers = new Headers();
  if (options && typeof options.headers === "object") {
    Object.keys(options.headers).forEach((key) =>
      headers.append(key, options.headers[key])
    );

    delete options.headers;
  }

  const { accessToken } = await getToken();

  accessToken && headers.append("Authorization", `Bearer ${accessToken}`);

  return fetch(url, { ...options, headers });
}

export async function getSession() {
  try {
    const response = await fetchWithAuth("/users/profile");
    if (response.status === 401)
      throw new Error("Vui lòng đăng nhập để tiếp tục");

    if (response.status === 403)
      throw new Error("Phiên đang nhập đã hết hạn, vui lòng đăng nhập lại");

    if (!response.ok)
      throw new Error("Đã xảy ra lỗi khi lấy thông tin người dùng");

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log("getSession error:", error.message);
    return null;
  }
}

export async function handleLogin(payload) {
  try {
    const response = await fetchWithAuth("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok || response.status !== 200)
      throw new Error(data?.message || "Đã xảy ra lỗi khi thực hiện đăng nhập");

    const { accessToken, refreshToken } = data.data;
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    return data.data;
  } catch (error) {
    alert(error.message);
    console.log("handleLogin Error:", error.message);
    return null;
  }
}

export async function handleLogout() {
  clearToken();
  await fetchWithAuth("/auth/logout", {
    method: "POST",
  });
  window.location.reload();
}
