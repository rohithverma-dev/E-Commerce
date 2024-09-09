import React, { Fragment, useEffect, useState, useContext } from "react";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import "./processOrder.css";
import {  useParams} from "react-router-dom";
import { Link , useNavigate } from "react-router-dom";
import Loading from "../layout/Loader/Loader.js"
import noteContext from "../../context/notes/noteContext.js"

import { MdCategory } from "react-icons/md";




const ProcessOrder = () => {
    const { id } = useParams();
    let history = useNavigate();
      const context = useContext(noteContext);
      const { Admin_updateOrder , myorder ,  getOrderDetails, isUpdated , setIsUpdated , loading  } = context;
  

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("status", status);
    Admin_updateOrder(id, myForm);
  };


  const [status, setStatus] = useState("");

  useEffect(() => {
 
      getOrderDetails(id);
    if (isUpdated) {
        console.log(`alert.success("order Updated Successfully");`);
        setIsUpdated(false)
        history("/admin/orders");
    }

  }, [ isUpdated]);

  return (


  //  <Fragment>
  //   {loading?(<Loading/>):( 
        <Fragment>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
        {loading? (<Loading/>) : (   <div
              className="confirmOrderPage"
              style={{
                display: myorder && myorder.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmshippingArea">
                  <h2 style={{fontWeight:'normal'}} >Shipping Info</h2>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Name:</p>
                      <span>{myorder && myorder.user && myorder.user.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {myorder && myorder.shippingInfo && myorder.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {myorder && myorder.shippingInfo &&
                          `${myorder.shippingInfo.address}, ${myorder.shippingInfo.city}, ${myorder.shippingInfo.state}, ${myorder.shippingInfo.pinCode}, ${myorder.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>

                  <h2 style={{fontWeight:'normal'}} >Payment</h2>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                            myorder &&  myorder.paymentInfo &&
                            myorder.paymentInfo.status === "succeeded"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {myorder && myorder.paymentInfo &&
                        myorder.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>

                    <div>
                      <p>Amount:</p>
                      <span>{myorder && myorder.totalPrice && myorder.totalPrice}</span>
                    </div>
                  </div>

                  < h2 style={{fontWeight:'normal'}}  >Order Status</h2>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                            myorder &&  myorder.orderStatus && myorder.orderStatus === "Delivered"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {myorder && myorder.orderStatus && myorder.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="confirmCartItems">
                  <h2 style={{fontWeight:'normal'}} >Your Cart Items:</h2>
                  <div className="confirmCartItemsContainer">
                    {myorder && myorder.orderItems &&
                      myorder.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                          <span>
                            {item.quantity} X ₹{item.price} ={" "}
                            <b>₹{item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: myorder &&  myorder.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <MdCategory />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {myorder && myorder.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {myorder && myorder.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>
                 <br/>
                 <br/>
                 <br/>
                  <button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </button>
                </form>
              </div>
            </div>)}
         
          
        </div>
      </div>
    {/* </Fragment>)} */}
   </Fragment>

 
  );
};

export default ProcessOrder;
