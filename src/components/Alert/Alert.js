import React from "react";
import InfoIcon from "./icons/InfoIcon";
import SuccessIcon from "./icons/SuccessIcon";
import ErrorIcon from "./icons/ErrorIcon";
import CloseIcon from "./icons/CloseIcon";

const alertStyle = {
  backgroundColor: "#c9a398",
  color: "black",
  padding: "10px",
  borderRadius: "3px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0px 2px 2px 2px rgba(0, 0, 0, 0.03)",
  width: "320px",
};

const AlertTemplate = ({ message, options, style, close }) => {
  return (
    <div style={{ ...alertStyle, ...style }} onClick={close}>
      {options.type === "info" && <InfoIcon />}
      {options.type === "success" && <SuccessIcon />}
      {options.type === "error" && <ErrorIcon />}
      <span style={{ flex: 2 }}>{message}</span>
      <CloseIcon />
    </div>
  );
};

export default AlertTemplate;
