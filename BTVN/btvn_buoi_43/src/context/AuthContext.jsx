import { createContext, useEffect, useReducer } from "react";
// utils
import request, { setSession } from "../utils/request";

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
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

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: "apiKey",
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      const apiKey = window.localStorage.getItem("api_key");
      const userEmail = window.localStorage.getItem("user_email");

      if (apiKey && userEmail) {
        setSession(apiKey, userEmail);
        try {
          const response = await request.get("/users/profile");
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user: { email: userEmail, name: response.data.data.emailId.name },
            },
          });
        } catch (error) {
          setSession(null, null);
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } else {
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

  const login = async (email) => {
    let response = await request.get("/api-key", { params: { email } });
    const apiKey = response.data.data.apiKey;

    setSession(apiKey, email);
    response = await request.get("/users/profile");
    dispatch({ type: "LOGIN", payload: { user: { email, name: response.data.data.emailId.name } } });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "apiKey",
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
