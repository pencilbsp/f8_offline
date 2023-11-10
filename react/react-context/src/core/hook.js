import { useContext } from "react";
import { ProviderContext } from "./Provider";

export function useSelector() {
  const { state } = useContext(ProviderContext);
  return state;
}

export function useDispatch() {
  const { dispatch } = useContext(ProviderContext);
  return dispatch;
}
