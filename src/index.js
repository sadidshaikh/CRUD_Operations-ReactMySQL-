import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./pages/Views.css";
import "./pages/Home.css";
import "./pages/AddEdit.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
