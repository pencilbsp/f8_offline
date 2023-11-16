import { useCallback, useMemo, useState } from "react";
import "./App.css";
import Histories from "./components/Histories";

import Input from "./components/Input";

function App() {
  const [value, setValue] = useState(0);
  const [histories, setHistories] = useState([]);

  const handleChange = (event) => {
    setValue(Number(event.target.value));
  };

  const handleAddHistory = () => {
    setHistories([...histories, { amount: value, createdAt: new Date() }]);
    setValue(0);
  };

  const handleClearHistories = useCallback(() => {
    setHistories([]);
  });

  const total = useMemo(() => histories.reduce((total, current) => total + current.amount, 0), [histories]);

  return (
    <>
      <input value={value} type="number" onChange={handleChange} />
      <button onClick={handleAddHistory}>Nạp tiền</button>
      <Histories histories={histories} total={total} onHistoriesCleared={handleClearHistories} />
    </>
  );
}

export default App;
