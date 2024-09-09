import React from "react";
import { MdLibraryAddCheck, MdLocalShipping } from "react-icons/md";
import { AiFillBank } from "react-icons/ai";
import "./CheckoutSteps.css";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    { label: "Shipping Details", icon: <MdLocalShipping /> },
    { label: "Confirm Order", icon: <MdLibraryAddCheck /> },
    { label: "Payment", icon: <AiFillBank /> },
  ];

  return (
    <div className="checkout-steps">
      {steps.map((step, index) => (
        <div key={index} className={`step ${activeStep >= index ? "active" : ""}`} >
          <div className="icon">{step.icon}</div>
          <div className="label">{step.label}</div>
        </div>
      ))}
      <div className="divider"></div>
    </div>
  );
};

export default CheckoutSteps;
