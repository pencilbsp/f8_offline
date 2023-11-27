import "./index.css";

import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
// redux
import { store } from "@/redux/store";
// contexts
import { AuthProvider } from "@/contexts/AuthContext";
//
import App from "./App";
import { Toaster } from "sonner";
// ----------------------------------------------------------------------

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ReduxProvider store={store}>
      <App />
      <Toaster richColors />
    </ReduxProvider>
  </AuthProvider>
);
