import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App.tsx";
import "./index.scss";
import GlobalStyle from "./components/GlobalStyle/GlobalStyle.tsx";
import React from "react";
import { ScreenSectionProvider } from "./context/ScreenSectionProvider.tsx";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ScreenSectionProvider>
        <BrowserRouter>
          <GlobalStyle>
            <App />
          </GlobalStyle>
        </BrowserRouter>
      </ScreenSectionProvider>
    </React.StrictMode>
  );
}
