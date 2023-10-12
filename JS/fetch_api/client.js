import { config } from "./config.js";

export const client = {
  send: async function (url, method = "GET", body = null) {
    url = `${config.SERVER_API}${url}`;

    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const data = await response.json();

    return { response, data };
  },
  get: function (url) {
    return this.send(url);
  },
  post: function (url, body) {
    return this.send(url, "POST", body);
  },
  delete: function (url) {
    return this.send(url, "DELETE", body);
  },
};
