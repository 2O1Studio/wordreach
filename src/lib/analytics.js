import amplitude from "amplitude-js";

export const logEvent = (event, eventProperties) => {
  if (!process.env.AMPLITUDE_KEY) {
    amplitude.getInstance().logEvent(event, eventProperties);
  }
};

export const initializeAnalytics = () => {
  if (process.env.AMPLITUDE_KEY) {
    amplitude.getInstance().init(process.env.AMPLITUDE_KEY);
  }
};
