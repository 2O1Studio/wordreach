import React from "react";
import { Link, Route, Routes } from "react-router-dom";
// import About from "./About/About";
import Home from "./Home/Home";
import Challenge from "./Challenge/Challenge";
// import Rules from "./Rules/Rules";
import Logo from "../assets/temp-logo.svg";
import styles from "./index.module.scss";

const App = () => {
  return (
    <div className="App">
      <div className={styles.header}>
        <Link to="/">
          <img width={236} height={34} src={Logo} alt="Word Reach logo" />
        </Link>
      </div>

      <p
        style={{
          textAlign: "center",
          marginTop: 10,
          marginBottom: 20,
          fontWeight: 600,
        }}
      >
        Cross the board from blue to green
        <br />
        with as few a words inbetween
      </p>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/challenge" element={<Challenge />} />
        {/* <Route path="/rules" element={<Rules />} /> */}
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </div>
  );
};

export default App;
