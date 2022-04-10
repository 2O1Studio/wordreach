import React from "react";
import * as ReactDOMClient from "react-dom/client";
import "./index.scss";
import App from "./components/App/App";
import { HashRouter } from "react-router-dom";

const container = document.getElementById("root");

// Create a root.
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the root.
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);

// During an update, there's no need to pass the container again.
// root.render(<App tab="profile" />);

// Useful codepen for dragging items
// https://codesandbox.io/s/silent-brook-y6h5o5?file=/src/Dustbin.js:528-713
