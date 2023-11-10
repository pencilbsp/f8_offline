import { createContext, useContext, useState } from "react";

const MoneyContent = createContext();
const rate = 24345;

export default function MoneyConvert() {
  const [money, setMoney] = useState({ vnd: 0, usd: 0 });

  const handleChangeVnd = (vnd) => {
    setMoney({ vnd, usd: vnd / rate });
  };
  const handleChangeUsd = (usd) => {
    setMoney({ usd, vnd: usd * rate });
  };

  return (
    <MoneyContent.Provider value={{ money, handleChangeVnd, handleChangeUsd }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <VndInput />
        <UsdInput />
      </div>
    </MoneyContent.Provider>
  );
}

function VndInput() {
  const { handleChangeVnd, money } = useContext(MoneyContent);
  const handleChange = (event) => handleChangeVnd(Number(event.target.value));

  return (
    <label htmlFor="">
      <input value={money.vnd} type="number" onChange={handleChange} />
      <span style={{ marginLeft: "8px" }}>VND</span>
    </label>
  );
}

function UsdInput() {
  const { handleChangeUsd, money } = useContext(MoneyContent);
  const handleChange = (event) => handleChangeUsd(Number(event.target.value));
  return (
    <label htmlFor="">
      <input value={money.usd} type="number" onChange={handleChange} />
      <span style={{ marginLeft: "8px" }}>USD</span>
    </label>
  );
}
