import { useAuth0 } from "@auth0/auth0-react";

export default function Login() {
  const { loginWithPopup } = useAuth0();

  const handleLogin = async () => {
    try {
      await loginWithPopup();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col text-center max-w-md mx-auto border p-4 gap-y-4 rounded-xl">
      <h1 className="font-semibold">Cảm ơn bạn đã sử dụng dịch vụ của F8</h1>
      <p>Nếu có bất kỳ câu hỏi hay trợ giúp nào, hãy đăng nhập và đặt câu hỏi tại đây!</p>
      <button onClick={handleLogin} className="self-center bg-orange-500 text-white flex-shrink px-3 py-1.5 rounded">
        Đăng nhập || đăng ký
      </button>
    </div>
  );
}
