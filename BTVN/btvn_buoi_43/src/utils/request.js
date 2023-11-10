import axios from "axios";
// config
import { HOST_API } from "../config";

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: HOST_API,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || "Something went wrong")
);

export const setSession = (accessToken, email) => {
  if (accessToken) {
    localStorage.setItem("api_key", accessToken);
    localStorage.setItem("user_email", email);
    axiosInstance.defaults.headers.common["X-Api-Key"] = accessToken;
  } else {
    localStorage.removeItem("api_key");
    localStorage.removeItem("user_email");
    delete axiosInstance.defaults.headers.common["X-Api-Key"];
  }
};

export default axiosInstance;
