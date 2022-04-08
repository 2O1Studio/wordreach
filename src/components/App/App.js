import "./App.scss";
import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import About from "../About/About";
import Home from "../Home/Home";

const App = () => {
  return (
    <div className="App">
      <>
        <nav>
          <ul id="navigation">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
      </>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default App;
