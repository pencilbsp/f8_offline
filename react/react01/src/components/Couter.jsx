import { Component } from "react";

export default class Couter extends Component {
  constructor(props) {
    super(props);
    console.log("1");
  }

  componentDidMount() {
    console.log("3");
  }

  componentDidUpdate() {}

  render() {
    console.log("2");
    return <div>Help me</div>;
  }
}
