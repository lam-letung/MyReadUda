import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import RootProvider from "./Context/RootProvider";

ReactDOM.render(
  <BrowserRouter>
    <RootProvider>
      <App />
    </RootProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
