import React from "react";
import { Link, Route, Routes } from "react-router-dom";
// import About from "./About/About";
import Home from "./Home/Home";
import Challenge from "./Challenge/Challenge";
// import Rules from "./Rules/Rules";
import Logo from "../assets/temp-logo.svg";
import styles from "./index.module.scss";
import Footer from "../components/Footer/Footer";

const App = () => {
  return (
    <div className="app">
      <div className={styles.header}>
        <Link to="/">
          <img width={236} height={34} src={Logo} alt="Word Reach logo" />
        </Link>
      </div>

      <div className={styles.content}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/challenge/:letterSet" element={<Challenge />} />
          {/* <Route path="/rules" element={<Rules />} /> */}
          {/* <Route path="/about" element={<About />} /> */}
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;
