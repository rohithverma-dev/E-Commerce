import React, { Fragment, useContext, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useParams } from "react-router-dom";
import noteContext from "../../context/notes/noteContext.js"
import ReviewCard from "./ReviewCard.js";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
// import { Rating } from "@material-ui/lab";
import Loading from "../layout/Loader/Loader.js"
import "./ProductDetails.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Stars from "../../CustomComponents/StarRating/Stars.js";

function ProductDetails() {
  const { id } = useParams();

  const context = useContext(noteContext);
  const { addItemsToCart, getProductDetails, isAuthenticated, product, cartItems, setCartItems, isUpdated, setIsUpdated, newReview, loading } = context;

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
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
    value: product.ratings  || 0,
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
      open ? setOpen(false) : setOpen(true);
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
    setOpen(false);
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
    <>
      <div className="ProductDetails">
        <div className="left-div">
          <Carousel className="hii_carousel">
            {product.images &&
              product.images.map((item, i) => (
                <img className="CarouselImage" key={i} src={item.url} alt={`${i} Slide`} />
              ))}
          </Carousel>
        </div>
        <div className="right-div">
          <div className="detailsBlock-1">
            <h1>{product.name}</h1>
            <p>Product # {product._id}</p>
          </div>
          <div className="detailsBlock-2">
            {product.ratings &&
              // <ReactStars {...options} />}
              // <Rating {...options} />
              <Stars options={options} />
            }
            <span>{product.Num_of_reviews} Reviews</span>
          </div>
          <div className="detailsBlock-3">
            <h1>{`₹${product.price}`}</h1>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button onClick={decreaseQuantity}>-</button>
                <input readOnly type="number" value={quantity} />
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
            Description : <h3>{product.description}</h3>
          </div>
          <button onClick={submitReviewToggle} className="submitReview"> Submit Review</button>
          {/* <button  className="submitReview"> Submit Review</button> */}
        </div>
      </div>

      <h3 className="reviewsHeading">REVIEWS</h3>
      <Dialog
        aria-labelledby="simple-dialog-title"
        open={open}
        onClose={submitReviewToggle}
      >
        <DialogTitle>Submit Review</DialogTitle>
        <DialogContent className="submitDialog">
          {product.reviews &&
            <Stars onChange={(e) => setRating(e.target.value)} options={options2} />
          }
          <textarea
            className="submitDialogTextArea"
            cols="30"
            rows="5"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </DialogContent>
        <DialogActions>
          <Button onClick={submitReviewToggle} color="secondary">
            Cancel
          </Button>
          <Button onClick={reviewSubmitHandler} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
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
