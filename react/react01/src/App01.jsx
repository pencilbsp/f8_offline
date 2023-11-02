import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Products from "./components/Products";

function App() {
  const status = false;
  const [count, setCount] = useState(0);
  const isLogin = false;

  const users = [
    {
      id: 1,
      name: "pencil",
    },
    {
      id: 2,
      name: "Hoang An",
    },
  ];

  const hanleClick = (event) => {
    console.log(event);
  };

  const handleBuy = (data) => {
    console.log(data);
  };

  return (
    <>
      <div>
        <Header showMenu={true} />

        {isLogin ? <h2>Chào mừng bạn quay trở lại</h2> : <h3>Vui lòng đăng nhập để tiếp tục</h3>}

        <div className={`title ${status ? " success" : ""}`}></div>
        <button onClick={hanleClick}>Click me</button>

        <Products name="Sản phầm 1" price={1200} onBuy={handleBuy} />

        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
        <Footer />
      </div>
    </>
  );
}

export default App;
