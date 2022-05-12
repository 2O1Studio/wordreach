import { React } from "react";
import { Button } from "../../components/Button/Button";
import amplitude from "amplitude-js";

const Home = () => {
  const sendAmplitudeEvent = (setNumber) => {
    console.log(setNumber);
    var event = "Button Clicked";
    var eventProperties = {
      selectedLetterSet: setNumber,
    };
    amplitude.getInstance().logEvent(event, eventProperties);
  };

  return (
    <div>
      <Button center to="/challenge/1" onClick={sendAmplitudeEvent(1)}>
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
    </div>
  );
};

export default Home;
