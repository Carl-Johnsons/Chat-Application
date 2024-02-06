import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App.tsx";
import "./index.scss";
import GlobalStyle from "./Components/GlobalStyle/GlobalStyle.tsx";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    // <React.StrictMode>
      <GlobalStyle>
        <App />
      </GlobalStyle>
    // </React.StrictMode>
  );
}
