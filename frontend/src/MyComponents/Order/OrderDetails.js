import React, { Fragment, useEffect , useContext} from "react";
import "./orderDetails.css";
import MetaData from "../layout/MetaData";
import { Link , useNavigate , useParams} from "react-router-dom";
import noteContext from "../../context/notes/noteContext.js"
import Loading from "../layout/Loader/Loader.js"


const OrderDetails = () => {
  let history = useNavigate();
  const { id } = useParams();
  const context = useContext(noteContext);
  const { myorder ,  getOrderDetails  , loading } = context;

  useEffect(() => {
    getOrderDetails(id)

  }, [ ]);
  return (
  
        <Fragment>
          <MetaData title="Order Details" />
        {loading?(<Loading/>):(  <Fragment>
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <h1 style={{ fontWeight:'normal' }} component="h1">
                Order #{myorder && myorder._id}
              </h1>
              <h2 style={{ fontWeight:'normal' }}>Shipping Info</h2>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{ myorder && myorder.user && myorder.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    { myorder && myorder.shippingInfo && myorder.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    { myorder &&  myorder.shippingInfo &&
                      `${myorder.shippingInfo.address}, ${myorder.shippingInfo.city}, ${myorder.shippingInfo.state}, ${myorder.shippingInfo.pinCode}, ${myorder.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <h2 style={{ fontWeight:'normal' }}>Payment</h2>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                        myorder &&   myorder.paymentInfo &&
                        myorder.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {  myorder &&  myorder.paymentInfo &&
                    myorder.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>{ myorder &&  myorder.totalPrice && myorder.totalPrice}</span>
                </div>
              </div>

              <h2 style={{ fontWeight:'normal' }}>Order Status</h2>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                        myorder &&   myorder.orderStatus && myorder.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    { myorder &&  myorder.orderStatus && myorder.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <h2 style={{ fontWeight:'normal' }}>Order Items:</h2>
              <div className="orderDetailsCartItemsContainer">
                { myorder && myorder.orderItems &&
                  myorder.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>
                        {item.name}
                      </Link>
                      <span>
                        {item.quantity} X ₹{item.price} =
                        <b>₹{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Fragment>)}
       </Fragment>
      
   
  );
};

export default OrderDetails;
