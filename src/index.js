import React from "react";
import ReactDOM from "react-dom/client";
import "../src/styles/styles.css";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";
import { ToastContainer } from 'react-toastify'
import { router } from "./routes";
import { RouterProvider } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Auth0Provider
      domain={process.env.REACT_APP_DOMAIN}
      clientId={process.env.REACT_APP_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <ToastContainer />
      <RouterProvider router={router} />
    </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
