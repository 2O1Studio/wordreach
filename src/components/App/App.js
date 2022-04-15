import "./App.scss";
import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import About from "../About/About";
import Home from "../Home/Home";

const App = () => {
  return (
    <div className="App">
      <div className="header">
        <Link to="/">
          <div className="wrLogo">WordReach</div>
        </Link>
      </div>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <div className="footer">
        <Link to="/about">About</Link>
      </div>
    </div>
  );
};

export default App;
