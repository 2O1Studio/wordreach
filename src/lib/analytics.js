import amplitude from "amplitude-js";

export const logEvent = (event, eventProperties) => {
  amplitude.getInstance().logEvent(event, eventProperties);
};
