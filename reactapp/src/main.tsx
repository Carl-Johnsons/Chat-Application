import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import GlobalStyle from "./Components/GlobalStyle/GlobalStyle.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <GlobalStyle>
      <App />
    </GlobalStyle>
  // </React.StrictMode>
);
