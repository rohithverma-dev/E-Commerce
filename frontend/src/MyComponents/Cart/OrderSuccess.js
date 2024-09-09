import React from "react";   
import "./orderSuccess.css";   
import Loading from "../layout/Loader/Loader.js"   
import { Link } from "react-router-dom";   
import { FaCheckCircle } from "react-icons/fa";   

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <FaCheckCircle />
      <h2 style={{fontWeight:'normal'}} >Your Order has been Placed successfully </h2>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
