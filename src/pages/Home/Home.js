import React, { useState } from "react";
import { Button } from "../../components/Button/Button";
import { InstructionModal } from "../../components/InstructionModal/InstructionModal";

const Home = () => {
  const [isOpen, setIsOpen] = useState(
    window.localStorage.getItem(`seenHowToPlay`) !== "true"
  );

  const handleClose = () => {
    window.localStorage.setItem(`seenHowToPlay`, "true");
    setIsOpen((o) => !o);
  };

  return (
    <>
      <InstructionModal isOpen={isOpen} handleClose={handleClose} />
      <Button center to="/challenge/daily">
        Daily Challenge
      </Button>
      <Button center to="/challenge/1">
        Letter set 1
      </Button>
      <Button center to="/challenge/2">
        Letter set 2
      </Button>
      <Button center to="/challenge/3">
        Letter set 3
      </Button>
      <Button center to="/challenge/4">
        Letter set 4
      </Button>
      <Button center to="/challenge/5">
        Letter set 5
      </Button>
      <Button center to="/challenge/6">
        Letter set 6
      </Button>
      <Button center to="/challenge/7">
        Letter set 7
      </Button>
    </>
  );
};

export default Home;
