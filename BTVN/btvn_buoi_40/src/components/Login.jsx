import { toast } from "sonner";
import { Component } from "react";
import Cookies from "universal-cookie";
import request from "../utils/request";

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  loginPromise = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    if (!email) throw new Error("Vui lòng điền email để tiếp tục");

    const query = new URLSearchParams({ email });
    const response = await request.http("/api-key?" + query.toString());

    const data = await response.json();
    if (data.code !== 200) throw new Error(data.message);

    const apiKey = data.data.apiKey;
    const cookies = new Cookies(null, { path: "/" });
    cookies.set("api_key", apiKey);
    cookies.set("user_email", email);
    this.props.onLoginSuccess(apiKey, email);
    return "Chào mừng bạn quay trở lại";
  };

  handleLogin = (event) => {
    toast.promise(() => this.loginPromise(event), {
      loading: "Đang đăng nhập...",
      success: (message) => message,
      error: (error) => error.message,
    });
  };

  render() {
    return (
      <div className="fixed inset-0 z-20 bg-slate-900/25 backdrop-blur container flex justify-center items-center">
        <div className="max-w-[320px] flex flex-col gap-2 p-4 bg-white text-gray-700 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Đăng nhập</h2>
          <p className="text-gray-600">Điền địa chỉ email đã đăng ký với F8</p>
          <form className="flex flex-col gap-2" onSubmit={this.handleLogin}>
            <input className="ring-1 rounded-md px-2 py-1" type="email" name="email" placeholder="Email của bạn" />
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="text-red-500 disabled:text-opacity-50 disabled:cursor-not-allowed"
                disabled
              >
                Cancel
              </button>
              <button type="submit" className="text-blue-500">
                Đăng nhập
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
