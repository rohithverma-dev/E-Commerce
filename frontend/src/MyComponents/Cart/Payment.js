import React, { Fragment, useEffect, useRef, useContext } from "react";
import CheckoutSteps from "../../CustomComponents/CheckoutSteps/CheckoutSteps.js"
import MetaData from "../layout/MetaData";
import { useNavigate } from "react-router-dom";
import Loading from "../layout/Loader/Loader.js"
import noteContext from "../../context/notes/noteContext.js";

import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import "./payment.css";

import { FaCreditCard } from "react-icons/fa6";
import { BsCalendar2EventFill } from "react-icons/bs";
import { MdOutlineVpnKey } from "react-icons/md";
import { PAYMENT_PROCESS } from "../../AllUrls.js";




const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  let history = useNavigate();

  const context = useContext(noteContext);
  const { shippingInfo, cartItems, setCartItems, user, createOrder, loading, setLoading } = context;

  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);



  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };
  

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
    description: "Order Payment for Order ID: " 
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
    try {
      const response = await fetch(PAYMENT_PROCESS, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),     // paymentData m ammount h 
      });
      const data = await response.json()
      const client_secret = await data.client_secret;
      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        console.log("alert.error(result.error.message)");
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          console.log("all right");
          createOrder(order);
          setCartItems([])
          localStorage.setItem("cartItems", JSON.stringify([]))
          history("/success");
        } else {
          console.log(" alert.error(There's some issue while processing payment  ")
        }
      }

    } catch (error) {
      payBtn.current.disabled = false;
      console.log(error.message)
    }
  };

  //   useEffect(() => {
  //     if (error) {
  //     console.log("alert.error(error);");
  //     //   clearErrors();
  //     }
  //   }, [ error]);


  return (

    <Fragment>
      {loading ? (<Loading />) : (<Fragment>
        <MetaData title="Payment" />
        <CheckoutSteps activeStep={2} />
        <div className="paymentContainer">
          <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
            <h1 style={{ fontWeight: 'normal', textAlign: "center" }} >Card Info</h1>
            <div>
              <FaCreditCard />
              <CardNumberElement className="paymentInput" />
            </div>
            <div>
              <BsCalendar2EventFill />
              <CardExpiryElement className="paymentInput" />
            </div>
            <div>
              <MdOutlineVpnKey />
              <CardCvcElement className="paymentInput" />
            </div>

            <input type="submit" disabled={
              loading ? true : false
            } value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`} ref={payBtn} className="paymentFormBtn" />
          </form>
        </div>
      </Fragment>)}
    </Fragment>


  );
};

export default Payment;
