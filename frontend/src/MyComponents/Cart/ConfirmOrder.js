import React, { Fragment, useEffect } from "react";
// import CheckoutSteps from "../Cart/CheckoutSteps";
import CheckoutSteps from "../../CustomComponents/CheckoutSteps/CheckoutSteps.js"
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link, useNavigate } from "react-router-dom";
import noteContext from "../../context/notes/noteContext.js"
import Loading from "../layout/Loader/Loader.js"
import { useContext } from "react";



const ConfirmOrder = () => {
    let history = useNavigate(); 
    const context = useContext(noteContext);
    const { shippingInfo , cartItems  , setShippingInfo  , isUpdated , setIsUpdated , user , setCartItems ,loading , setLoading} = context;
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + tax + shippingCharges;
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;
  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    history("/process/payment");
  };
  useEffect(() => {
    setLoading(true)
    
    setCartItems( localStorage.getItem("cartItems")  ? JSON.parse( localStorage.getItem("cartItems")):[] )
    setShippingInfo( localStorage.getItem("shippingInfo")  ? JSON.parse( localStorage.getItem("shippingInfo")):[] )

    setLoading(false)
  }, [ ])
  return (

    <Fragment>
      {loading ? (<Loading/>): (  <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      {loading ? (<Loading/>):(  
         <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <h2 style={{fontWeight:'normal'}} >Shipping Info</h2>
            <div className="confirmshippingAreaBox">
              <div>
                 <p>Name:</p> <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>  <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>  <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <h2 style={{fontWeight:'normal'}}  >Your Cart Items:</h2>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>
                    <span>
                      {item.quantity} X ₹{item.price} = <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div>
          <div className="orderSummary">
            <h2 style={{fontWeight:'normal'}} >Order Summery</h2>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p> <b>Total:</b> </p>   <span>₹{totalPrice}</span>
            </div>

            <button  disabled={
                  loading ? true : false 
                } onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
      )}
   
    </Fragment>)}
    </Fragment>

  
  );
};

export default ConfirmOrder;
