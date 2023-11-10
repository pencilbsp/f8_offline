import { useContext, useState } from "react";

import { AppContext } from "../App";

export default function Couter() {
  const [count, setCount] = useState(0);
  const content = useContext(AppContext);

  const handleIncrement = () => setCount(count + content.step1);
  const handleDecrement = () => setCount(count - content.step1);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={handleDecrement}>-</button>
      <button onClick={handleIncrement}>+</button>
    </div>
  );
}
