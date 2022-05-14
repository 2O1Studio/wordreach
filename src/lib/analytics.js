import amplitude from "amplitude-js";

export const logEvent = (event, eventProperties) => {
  if (process.env.REACT_APP_AMPLITUDE_API_KEY) {
    amplitude.getInstance().logEvent(event, eventProperties);
  }
};

export const initializeAnalytics = () => {
  if (process.env.REACT_APP_AMPLITUDE_API_KEY) {
    amplitude.getInstance().init(process.env.REACT_APP_AMPLITUDE_API_KEY);
  }
};
