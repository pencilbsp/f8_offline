import { Component } from "react";

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email")
    const password = formData.get("password")
    console.log("Login...", { email, password });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" />
          </div>
          <div>
            <label htmlFor="password">Mật khẩu</label>
            <input type="password" name="password" />
          </div>
          <button>Login</button>
        </form>
      </div>
    );
  }
}
