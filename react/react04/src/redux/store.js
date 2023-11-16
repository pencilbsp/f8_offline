import thunk from "redux-thunk";
import { combineReducers, legacy_createStore as createStore, applyMiddleware } from "redux";

import { todoReducer } from "./reducers/todo";
import { counterReducer } from "./reducers/counter";
import { composeWithDevTools } from "@redux-devtools/extension";

const rootReducer = combineReducers({
  todo: todoReducer,
  counter: counterReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
