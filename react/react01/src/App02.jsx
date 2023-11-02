import { Component } from "react";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }

  handleIncrement = () => {
    console.log("+");
    this.setState({
      count: this.state.count + 1,
    });
  };

  handleDecrement = () => {
    console.log("-");
    this.setState({
      count: this.state.count - 1,
    });
  };

  render() {
    return (
      <div>
        <h1>Count {this.state.count}</h1>
        <button onClick={this.handleIncrement}>+</button>
        <button onClick={this.handleDecrement}>-</button>
      </div>
    );
  }
}
