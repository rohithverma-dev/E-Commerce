import React, { Fragment , useContext , useEffect } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard.js";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import noteContext from "../../context/notes/noteContext.js"
import Loading from "../layout/Loader/Loader.js"
import { Link, useNavigate } from "react-router-dom";

const Cart = () => { 
  let history = useNavigate();
  const context = useContext(noteContext);
  const { addItemsToCart  ,cartItems , setCartItems , isUpdated , setIsUpdated , removeItemsFromCart, loading , setLoading} = context;

  useEffect(() => {
    setLoading(true)
    setCartItems( localStorage.getItem("cartItems")  ? JSON.parse( localStorage.getItem("cartItems")):[] )
    if (isUpdated) {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
    setIsUpdated(false)

    
  }
  setLoading(false)

    
  }, [isUpdated , setLoading]);  


  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    addItemsToCart(id, newQty);
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    addItemsToCart(id, newQty);
  };

  const deleteCartItems = (id) => {
    removeItemsFromCart(id);
  };

  const checkoutHandler = () => {
    history("/login?redirect=shipping");
  };

  return (
  
    <Fragment>
      {loading? (<Loading/>) : (  <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />
          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
          <br />
          
          <Link to="/orders">My Orders</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <div className="cartInput">
                    <button onClick={() =>  decreaseQuantity(item.product, item.quantity)  }  >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock  )}>
                      +
                    </button>
                  </div>
                  <h3 className="cartSubtotal">{`₹${
                    item.price * item.quantity
                  }`}</h3>
                </div>
              ))}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <h3>Gross Total</h3>
                <h3>{`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</h3>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button   disabled={
                  loading ? true : false 
                } onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>) }
    </Fragment>

  



  );
};

export default Cart;



