import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";
import { BiSolidErrorCircle } from "react-icons/bi";

const NotFound = () => {
  return (
    <div style={{fontSize:'22px'}} className="PageNotFound">
     <BiSolidErrorCircle  />
      <h1 style={{fontWeight:'normal'}}  >Page Not Found </h1>
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotFound;
