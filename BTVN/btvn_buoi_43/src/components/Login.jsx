import { toast } from "sonner";
import Cookies from "universal-cookie";
import request from "../utils/request";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const { login } = useAuth();

  const loginPromise = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    if (!email) throw new Error("Vui lòng điền email để tiếp tục");

    await login(email);

    return "Chào mừng bạn quay trở lại";
  };

  const handleLogin = (event) => {
    toast.promise(() => loginPromise(event), {
      loading: "Đang đăng nhập...",
      success: (message) => message,
      error: (error) => error.message,
    });
  };

  return (
    <div className="fixed inset-0 z-20 bg-slate-900/25 backdrop-blur flex justify-center items-center">
      <div className="max-w-[320px] flex flex-col gap-2 p-4 bg-white text-gray-700 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Đăng nhập</h2>
        <p className="text-gray-600">Điền địa chỉ email đã đăng ký với F8</p>
        <form className="flex flex-col gap-2" onSubmit={handleLogin}>
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
