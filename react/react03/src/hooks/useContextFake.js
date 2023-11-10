import { useContext } from "react";

export function useContextFake(Context) {
  return Context._currentValue;
}
