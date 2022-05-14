import React from "react";
import * as ReactDOMClient from "react-dom/client";
import "./index.scss";
import App from "./pages";
import { HashRouter } from "react-router-dom";
import { Provider as AlertProvider } from "@blaumaus/react-alert";
import AlertTemplate from "./components/Alert/Alert";

const container = document.getElementById("root");

// Create a root.
const root = ReactDOMClient.createRoot(container);

const options = {
  position: "middle",
  timeout: 3500,
};

// Initial render: Render an element to the root.
root.render(
  <React.StrictMode>
    <HashRouter>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </HashRouter>
  </React.StrictMode>
);

// During an update, there's no need to pass the container again.
// root.render(<App tab="profile" />);
