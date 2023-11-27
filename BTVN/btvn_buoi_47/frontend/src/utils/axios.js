import axios from "axios";
// config
import { HOST_API } from "./config";

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: HOST_API,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.error;
    return Promise.reject(message || "Đã có lỗi xảy ra, thử lại sau");
  }
);

export default axiosInstance;
