/*
Footer.js
--------------------------------------------------------------------------------
Description:
The footer available throughout cyfer.
*/

import React, { useEffect } from 'react';
import './Footer.scss';
import Button from '@mui/material/Button';
import { InstructionModal } from "../Modal/Modal";

const Footer = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <footer className="footer">
      <Button onClick={handleOpen} size="small" className="howToBtn">How to play</Button>
      <div className="copyright">&copy; 201Studio 2022. All rights reserved.</div>

      <InstructionModal open={open} handleClose={handleClose} />
    </footer>
  );
};

export default Footer;
