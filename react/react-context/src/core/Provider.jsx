/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";
import { initialState, rootReducer } from "./rootReducer";

export const ProviderContext = createContext();

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return <ProviderContext.Provider value={{ state, dispatch }}>{children}</ProviderContext.Provider>;
};

export default Provider;
