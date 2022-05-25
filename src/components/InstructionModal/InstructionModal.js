import { Dialog } from "@headlessui/react";
import EndGame from "../../assets/wrEndGame.png";
import { Button } from "../Button/Button";
import classes from "./InstructionModal.module.scss";
export const InstructionModal = ({ isOpen, handleClose }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      style={{ position: "relative" }}
    >
      <div className={classes.backdrop} aria-hidden="true" />

      <Dialog.Panel className={classes.modal}>
        <Dialog.Title>How to play...</Dialog.Title>
        <Dialog.Description>
          Start by placing a letter in any blue box, and then create a word
          vertically or horizontally. To win, keep building off, or adding to
          existing words until you reach a green box!
        </Dialog.Description>

        <p>
          Are you sure you want to deactivate your account? All of your data
          will be permanently removed. This action cannot be undone.
        </p>
        <p>Good luck</p>

        <img
          className="modalImg"
          width={300}
          src={EndGame}
          alt="End game state"
        />

        <Button center isButton onClick={handleClose}>
          Thanks!
        </Button>
      </Dialog.Panel>
    </Dialog>
  );
};
