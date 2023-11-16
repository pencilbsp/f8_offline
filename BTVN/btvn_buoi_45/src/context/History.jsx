import { createContext, useCallback, useContext, useMemo, useState } from "react";

const HistoryContext = createContext();
const defaultContext = { addHistory: (_) => {}, histories: [] };

export const useHistory = () => useContext(HistoryContext) ?? defaultContext;

export function HistoryProvider({ children }) {
  const [histories, setHistories] = useState(() => getHistories());

  const addHistory = useCallback((history, number, tryCount) => {
    const list = [{ time: Date.now(), number, history, tryCount }, ...histories];
    setHistories(list);

    // Save to storage
    try {
      localStorage.setItem("game_histories", JSON.stringify(list));
    } catch (e) {
      // Unsupported
    }
  }, []);

  const clearHistory = useCallback(() => {
    setHistories([]);

    // Save to storage
    try {
      localStorage.setItem("game_histories", "[]");
    } catch (e) {
      // Unsupported
    }
  }, []);

  const providerValue = useMemo(
    () => ({
      histories,
      addHistory,
      clearHistory,
    }),
    [histories, addHistory]
  );
  return <HistoryContext.Provider value={providerValue}>{children}</HistoryContext.Provider>;
}

const getHistories = () => {
  let histories = [];
  try {
    const string = localStorage.getItem("game_histories");
    histories = JSON.parse(string || "[]");
  } catch (error) {}
  return histories;
};
