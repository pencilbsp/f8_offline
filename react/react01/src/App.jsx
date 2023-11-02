import { Component } from "react";
import Couter from "./components/Couter";
import Login from "./components/Login";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
    };
  }

  render() {
    return (
      <div>
        {this.state.isShow && <Couter />}
        <button
          onClick={() => {
            this.setState({
              isShow: !this.state.isShow,
            });
          }}
        >
          Toggle
        </button>
        <Login />
      </div>
    );
  }
}
