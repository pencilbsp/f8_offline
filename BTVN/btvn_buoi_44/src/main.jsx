import React from "react";
import { Toaster } from "sonner";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";

import { AUTH0_API } from "./config";

import "./index.css";

import App from "./App";

const onRedirectCallback = (appState) => {
  history.push(appState && appState.returnTo ? appState.returnTo : window.location.pathname);
};

const providerConfig = {
  domain: AUTH0_API.domain,
  clientId: AUTH0_API.clientId,
  onRedirectCallback,
  authorizationParams: {
    redirect_uri: window.location.origin,
  },
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider {...providerConfig}>
      <Toaster />
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
