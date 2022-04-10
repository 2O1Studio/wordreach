import React from "react";
import "./Home.scss";
import LetterBox from "../LetterBox/LetterBox";

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
        <LetterBox displayLetter="E" />
        <LetterBox displayLetter="L" />
        <LetterBox displayLetter="L" />
        <LetterBox displayLetter="O" />
        <LetterBox displayLetter="!" />
        <LetterBox displayLetter="!" />
      </div>
    </>
  );
};

export default Home;
