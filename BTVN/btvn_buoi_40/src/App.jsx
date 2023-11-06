import { Toaster } from "sonner";
import { Component } from "react";
import Cookies from "universal-cookie";

import Todo from "./components/Todo";
import request from "./utils/request";
import Login from "./components/Login";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLogin: null };
  }

  handleLoginSuccess = (apiKey, userEmail) => {
    const isLogin = request.setAuth(apiKey, userEmail);
    this.setState({ isLogin });
  };

  componentDidMount = () => {
    const cookies = new Cookies();
    const apiKey = cookies.get("api_key");
    const userEmail = cookies.get("user_email");
    if (apiKey && userEmail) this.handleLoginSuccess(apiKey, userEmail);
  };

  render() {
    return (
      <div className="w-full h-full container p-4">
        <Toaster richColors closeButton position="top-right" />
        <Todo user={this.state.isLogin} />
        {!this.state.isLogin && <Login onLoginSuccess={this.handleLoginSuccess} />}
      </div>
    );
  }
}
