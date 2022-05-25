import React, { useState } from "react";
import "./Footer.scss";
import Button from "@mui/material/Button";
import { InstructionModal } from "../InstructionModal/InstructionModal";

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <footer className="footer">
      <Button
        onClick={() => setIsOpen((o) => !o)}
        size="small"
        className="howToBtn"
      >
        How to play
      </Button>
      <div className="copyright">
        &copy; 201Studio 2022. All rights reserved.
      </div>

      {/* <InstructionModal isOpen={isOpen} handleClose={() => setIsOpen(false)} /> */}
    </footer>
  );
};

export default Footer;
