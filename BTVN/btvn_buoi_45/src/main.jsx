import React from "react";
import { Toaster } from "sonner";
import ReactDOM from "react-dom/client";

import { Theme } from "@radix-ui/themes";

import "./index.css";
import "@radix-ui/themes/styles.css";

import App from "./App";
import { ThemeProvider } from "./context/Theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider attribute="class">
      <Theme>
        <App />
        <Toaster richColors={true} />
      </Theme>
    </ThemeProvider>
  </React.StrictMode>
);
