import React from "react";
import "./ServiceUnavailable.scss";

const ServiceUnavailable = ({ message }) => {
  return <div className="service-unavailable-container">{message}</div>;
};

export default ServiceUnavailable;
