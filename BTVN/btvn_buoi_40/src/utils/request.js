import Cookies from "universal-cookie";

class Request {
  constructor() {
    this.apiKey = null;
    this.userEmail = null;
    this.API_ENDPOIT = import.meta.env.VITE_API_ENDPOIT;
  }

  setAuth = (apiKey, userEmail) => {
    this.apiKey = apiKey;
    this.userEmail = userEmail;
    if (!this.apiKey || !this.userEmail) {
      const cookies = new Cookies();
      cookies.remove("api_key");
      cookies.remove("user_email");
      window.location.reload();
    } else {
      return this.userEmail;
    }
  };

  /**
   *
   * @param {string} url
   * @param {RequestInit} options
   * @returns
   */
  http = async (url, options = { method: "GET" }) => {
    if (!url.startsWith("http") && this.API_ENDPOIT) {
      url = this.API_ENDPOIT + url;
    }

    const headers = new Headers(options.headers);

    if (this.apiKey) {
      headers.append("X-Api-Key", this.apiKey);
    }

    if (!headers.has("Content-Type")) {
      headers.append("Content-Type", "application/json");
    }

    if (typeof options.body === "object") {
      options.body = JSON.stringify(options.body);
    }

    const response = await fetch(url, { ...options, headers });
    if (response.status === 401) this.setAuth(null, null);

    return response;
  };
}

const request = window.request || new Request();
if (import.meta.env.MODE !== "production") window.request = request;
export default request;
