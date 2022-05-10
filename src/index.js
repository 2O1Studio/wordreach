import React from "react";
import * as ReactDOMClient from "react-dom/client";
import "./index.scss";
import App from "./pages";
import { HashRouter } from "react-router-dom";
import amplitude from "amplitude-js";

// Amplitude initialisation
amplitude.getInstance().init("ae009176a3fe772cdf4973b50c43aef9");

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
