import React, { useState } from "react";
import "./Footer.scss";
import { InstructionModal } from "../InstructionModal/InstructionModal";
import { Button } from "../Button/Button";

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <footer className="footer">
      <Button center isButton onClick={() => setIsOpen((o) => !o)}>
        How to play
      </Button>
      <div className="copyright">
        &copy; 201Studio 2022. All rights reserved.
      </div>

      <InstructionModal isOpen={isOpen} handleClose={() => setIsOpen(false)} />
    </footer>
  );
};

export default Footer;
