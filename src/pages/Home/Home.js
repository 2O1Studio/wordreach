import React from 'react';
import { Button } from "../../components/Button/Button";
import { InstructionModal } from "../../components/Modal/Modal";

const Home = () => {

  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);


  return (
    <>
      <InstructionModal open={open} handleClose={handleClose} />
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
