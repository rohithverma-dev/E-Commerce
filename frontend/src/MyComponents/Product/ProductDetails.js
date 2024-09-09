import React, { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import noteContext from "../../context/notes/noteContext.js"
import ReviewCard from "./ReviewCard.js";
import Loading from "../layout/Loader/Loader.js"
import "./ProductDetails.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Stars from "../../CustomComponents/StarRating/Stars.js";
import ImageCoursel from "../../CustomComponents/ImageCarousel/ImageCarousel.js";
import Modal from "../../CustomComponents/Modal/Modal.js";
import Loader from "../layout/Loader/Loader.js";

function ProductDetails() {
  const { id } = useParams();

  const context = useContext(noteContext);
  const { addItemsToCart, getProductDetails, isAuthenticated, product, cartItems, setCartItems, isUpdated, setIsUpdated, newReview, loading } = context;

  const [modal, setModal] = useState(false)
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const options = {
    edit: false,
    totalStars: 5,
    size: window.innerWidth < 600 ? 5.5 : 7,
    value: product.ratings || 0,
  }

  const options2 = {
    edit: true,
    totalStars: 5,
    size: window.innerWidth < 600 ? 5.5 : 7,
    value: product.ratings || 0,
  }


  const addToCartHandler = () => {
    addItemsToCart(id, quantity);
  };

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };


  const submitReviewToggle = () => {
    if (isAuthenticated) {
      modal ? setModal(false) : setModal(true);
    }
    else {
      toast.info("Please Login To Submit Review", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };


  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);
    newReview(myForm);
  };




  useEffect(() => {
    setCartItems(localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [])
    getProductDetails(id);
    if (isUpdated) {
      getProductDetails(id);
      localStorage.setItem("cartItems", JSON.stringify(cartItems))
      setIsUpdated(false)
    }

  }, [isUpdated]);





  return (
    loading ? <Loader /> :
      <>
        <div className="ProductDetails">
          <div className="left-div">
            {product && product.images && <ImageCoursel allImages={product.images} interval_Time={2500} />}
          </div>
          <div className="right-div">
            <div className="detailsBlock-1">
              <h1>{product.name}</h1>
              <p>Product # {product._id}</p>
            </div>
            <div className="detailsBlock-2">
              {product && product.reviews &&
                <Stars options={options} />
              }
              <span>{product.Num_of_reviews} Reviews</span>
            </div>
            <div className="detailsBlock-3">
              <h1>{`₹${product.price}`}</h1>
              <div className="detailsBlock-3-1">
                <div className="detailsBlock-3-1-1">
                  <button onClick={decreaseQuantity}>-</button>
                   <input style={{backgroundColor:'black' , color:'white' }} readOnly type="number" value={quantity} />
                  <button onClick={increaseQuantity}>+</button>
                </div>
                {(product.Stock >= 1) &&
                  <button disabled={product.Stock < 1 ? true : false} onClick={addToCartHandler} >Add to Cart </button>
                }
              </div>
              <h1>
                Status:
                <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                  {product.Stock < 1 ? "OutOfStock" : "InStock"}
                </b>
              </h1>
            </div>
            <div className="detailsBlock-4">
              Description : <h4 style={{ fontWeight: 'normal' }} >{product.description}</h4>
            </div>
            <button onClick={submitReviewToggle} className="submitReview"> Submit Review</button>
          </div>
        </div>

        <h3 className="reviewsHeading">REVIEWS</h3>


        <Modal options={options2} modal={modal} setModal={setModal} rating={rating} setRating={setRating} handleSubmit={reviewSubmitHandler} comment={comment} setComment={setComment} />


        {product && product.reviews && product.reviews[0] ? (
          <div className="reviews">
            {product && product.reviews &&
              product.reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
          </div>
        ) : (
          <p className="noReviews">No Reviews Yet</p>
        )}



      </>


  );
}

export default ProductDetails;
