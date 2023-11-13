import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import { MailIcon } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";

import { EMAILJS } from "../config";

export default function Support({ user }) {
  const { logout } = useAuth0();
  emailjs.init(EMAILJS.publicKey);

  const handleSupport = (event) => {
    const send = async (event) => {
      event.preventDefault();
      event.preventDefault();
      const formData = new FormData(event.target);
      const email = formData.get("email");
      const message = formData.get("message");
      const templateParams = { email, message, to_name: user.name };
      const status = await emailjs.send(EMAILJS.serviceId, EMAILJS.templateID, templateParams);
      console.log(status);
    };

    toast.promise(() => send(event), {
      loading: "Đang gửi yêu cầu...",
      success: "Gửi yêu cầu hỗ trợ thành công",
      error: (error) => error.message,
    });
  };

  return (
    <div className="border p-4 flex flex-col gap-y-4 rounded-xl max-w-sm w-full">
      <div className="flex flex-col items-center gap-y-2">
        <img className="w-12 h-12 border rounded-full" src={user.picture} alt={user.name} />
        <h1 className="font-bold">Xin chào {user.name}!</h1>
      </div>
      <form className="flex flex-col gap-y-3" onSubmit={handleSupport}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email của bạn
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
              <MailIcon className="stroke-gray-400" size={16} />
            </div>
            <input
              required
              id="email"
              type="email"
              name="email"
              placeholder="Email của bạn"
              className="block w-full rounded-md border-0 py-1.5 pl-8 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">
            Tin nhắn
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <textarea
              id="message"
              name="message"
              placeholder="Tin nhắn của bạn"
              defaultValue="Tôi cần trợ giúp bài tập về nhà!"
              className="block w-full rounded-md border-0 p-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <button type="submit" className="bg-green-500 text-white rounded-md px-2 py-1.5">
          Gửi yêu cầu hỗ trợ
        </button>
      </form>

      <button type="button" onClick={logout} className="bg-orange-500 text-white rounded-md px-2 py-1.5">
        Đăng xuất
      </button>
    </div>
  );
}
