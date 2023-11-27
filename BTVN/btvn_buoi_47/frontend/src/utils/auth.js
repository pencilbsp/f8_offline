import axios from "./axios";

// ----------------------------------------------------------------------

export const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    // Xử lý khi {{accessToken}} hết hạn
  } else {
    localStorage.removeItem("accessToken");
    delete axios.defaults.headers.common["Authorization"];
  }
};
