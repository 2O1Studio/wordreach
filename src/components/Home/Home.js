import React from "react";
import "./Home.scss";
import LetterBox from "../LetterBox/LetterBox";
import AvailableLetterBox from "../LetterBox/AvailableLetterBox";

const Home = () => {
  return (
    <>
      {/* <div className="title">Welcome to Word Reach</div> */}

      <div className="letterGrid">
        <LetterBox displayLetter="H" colour="landColour" />
        <LetterBox displayLetter="E" />
        <LetterBox displayLetter="L" />
        <LetterBox displayLetter="L" />
        <LetterBox displayLetter="O" />
        <LetterBox displayLetter="!" />
        <LetterBox displayLetter="!" />
        <LetterBox displayLetter="!" colour="landColour" />
        <LetterBox displayLetter="H" colour="landColour" />
        <LetterBox displayLetter="E" />
        <LetterBox displayLetter="L" />
        <LetterBox displayLetter="L" />
        <LetterBox displayLetter="O" />
        <LetterBox displayLetter="!" />
        <LetterBox displayLetter="!" />
        <LetterBox displayLetter="!" colour="landColour" />
        <LetterBox displayLetter="H" colour="landColour" />
        <LetterBox displayLetter="E" />
        <LetterBox displayLetter="L" />
        <LetterBox displayLetter="L" />
        <LetterBox displayLetter="O" />
        <LetterBox displayLetter="!" />
        <LetterBox displayLetter="!" />
        <LetterBox displayLetter="!" colour="landColour" />
        <LetterBox displayLetter="H" colour="landColour" />
        <LetterBox displayLetter="E" />
        <LetterBox displayLetter="L" />
        <LetterBox displayLetter="L" />
        <LetterBox displayLetter="O" />
        <LetterBox displayLetter="!" />
        <LetterBox displayLetter="!" />
        <LetterBox displayLetter="!" colour="landColour" />
        <LetterBox displayLetter="H" colour="landColour" />
        <LetterBox displayLetter="E" />
        <LetterBox displayLetter="L" />
        <LetterBox displayLetter="L" />
        <LetterBox displayLetter="O" />
        <LetterBox displayLetter="!" />
        <LetterBox displayLetter="!" />
        <LetterBox displayLetter="!" colour="landColour" />
        <LetterBox displayLetter="H" colour="landColour" />
        <LetterBox displayLetter="E" />
        <LetterBox displayLetter="L" />
        <LetterBox displayLetter="L" />
        <LetterBox displayLetter="O" />
        <LetterBox displayLetter="!" />
        <LetterBox displayLetter="!" />
        <LetterBox displayLetter="!" colour="landColour" />
      </div>

      <div className="letterSelection">
        <AvailableLetterBox displayLetter="E" />
        <AvailableLetterBox displayLetter="L" />
        <AvailableLetterBox displayLetter="L" />
        <AvailableLetterBox displayLetter="O" />
        <AvailableLetterBox displayLetter="!" />
        <AvailableLetterBox displayLetter="4" />
      </div>
    </>
  );
};

export default Home;
