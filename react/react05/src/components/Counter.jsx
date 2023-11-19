import { useDispatch, useSelector } from "react-redux";

import { counterSlice } from "../redux/slice/counterSlice";

const { increament, decreament } = counterSlice.actions;

export default function Counter() {
  const { count } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increament(1))}>+</button>
      <button onClick={() => dispatch(decreament(1))}>-</button>
    </div>
  );
}
