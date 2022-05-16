import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import EndGame from "../../assets/wrEndGame.png";
import "./Modal.scss";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 300,
  maxWidth: '90%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
};

export const InstructionModal = (props) => {
  const { open, handleClose } = props;
  // const [open, setOpen] = React.useState(true);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="ModalBox">
          <h1>How to play...</h1>
          <div>Start by placing a letter in any blue box, and then create a word vertically or horizontally.
            To win, keep building off, or adding to existing words until you reach a green box! </div>
          <div>Good luck!</div>
          <img className="modalImg" width={300} src={EndGame} alt="End game state" />
          <Button variant="contained" onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
}
