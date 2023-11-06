import { useReducer } from "react";
import { reducer } from "./reducer";

export default function App() {
  const initialState = { count: 0 };
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleIncrement = () => {
    dispatch({
      type: "counter/increment",
      payload: 1,
    });
  };
  const handleDecrement = () => {
    dispatch({
      type: "counter/decrement",
      payload: 1,
    });
  };

  return (
    <div>
      <h1>Count: {state.count}</h1>
      <button onClick={handleDecrement}>-</button>
      <button onClick={handleIncrement}>+</button>
    </div>
  );
}
