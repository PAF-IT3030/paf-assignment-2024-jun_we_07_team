import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from 'styled-components';
import App from "./App";
import { AuthContextProvider } from "./context/authContext";
import { DarkModeContextProvider } from "./context/darkModeContext";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
  }
`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>
        <GlobalStyle />
        <App />
      </AuthContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
);
