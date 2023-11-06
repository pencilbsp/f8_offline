import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (event) => {
    if (event.target.type === "email") {
      setEmail(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ email, password });
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <label style={{ display: "block" }}>
          Email
          <input value={email} type="email" name="email" placeholder="Email" onChange={handleChange} />
        </label>
        <label style={{ display: "block" }}>
          Password
          <input value={password} type="password" name="password" placeholder="Password" onChange={handleChange} />
        </label>
        <button>Login</button>
      </form>
    </div>
  );
}
