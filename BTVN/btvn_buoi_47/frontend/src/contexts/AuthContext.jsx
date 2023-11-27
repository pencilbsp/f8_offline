import { createContext, useEffect, useReducer } from "react";

// utils
import axios from "../utils/axios";
import { setSession } from "../utils/auth";

// ----------------------------------------------------------------------

const initialState = {
  user: null,
  isInitialized: false,
  isAuthenticated: false,
};

const hanlder = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
};

const reducer = (state, action) =>
  hanlder[action.type] ? hanlder[action.type](state, action) : state;

export const AuthContext = createContext({
  ...initialState,
  method: "API_KEY",
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        if (!accessToken) throw new Error();

        setSession(accessToken);

        const response = await axios.get("/auth/user-profile");

        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: true,
            user: response.data.user,
          },
        });
      } catch (error) {
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (params) => {
    let response = await axios.get("/auth/api-key", { params });
    const { accessToken, user } = response.data;

    setSession(accessToken);

    dispatch({
      type: "LOGIN",
      payload: {
        user,
      },
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, method: "API_KEY", login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
