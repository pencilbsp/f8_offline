export default function LoginPage() {
  return (
    <div className="max-w-md">
      <form action="" className="flex flex-col gap-2">
        <input cl name="email" type="email" placeholder="Email" />
        <input name="password" type="password" placeholder="Mật khẩu" />
        <button>Login</button>
      </form>
    </div>
  );
}
