/* eslint-disable react-refresh/only-export-components */
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import Content from "./Content";
import { useContextFake } from "../hooks/useContextFake";
import { AuthContext } from "../context/AuthContext";
import { forwardRef } from "react";

function Counter(_, ref) {
  const { count } = useContextFake(AuthContext);

  return (
    // <AuthContext.Consumer>
    //   {(context) => {
    <div>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button ref={ref}>count is {count}</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <Content />
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </div>
    //   }}
    // </AuthContext.Consumer>
  );
}

export default forwardRef(Counter);
