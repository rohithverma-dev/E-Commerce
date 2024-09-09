import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./productReviews.css";
import MetaData from "../layout/MetaData";
import Loading from "../layout/Loader/Loader.js"
import { IoIosStar } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SideBar from "./Sidebar";
import noteContext from "../../context/notes/noteContext.js";
import ColumnRow from "../../CustomComponents/ColumnRowTable/ColumnRow.js";



const ProductReviews = () => {
  let history = useNavigate();
  const context = useContext(noteContext);
  const { Admin_getAllReviews, admin_allreviews, Admin_deleteReview, isDeleted, setIsDeleted, loading } = context;

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (  reviewId) => {
    console.log("donneee" ,  reviewId , typeof reviewId );
    Admin_deleteReview( Number(reviewId) , productId);
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    if (productId.length === 24) {
      Admin_getAllReviews(productId);
    }
    else {
      toast.error("productId is not correct", {
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

  useEffect(() => {
    if (productId.length === 24) {
      Admin_getAllReviews(productId);
    }

    if (isDeleted) {
      console.log(`alert.success("Review Deleted Successfully");`);
      setIsDeleted(false)
      history("/admin/reviews");
    }
  }, [isDeleted]);



  const columns = [
    { field: "id", headerName: "Review ID", flex: 2 },
    { field: "user", headerName: "User", flex: 1.5, },
    { field: "comment", headerName: "Comment", flex: 1, },
    { field: "rating", headerName: "Rating", flex: 1, },
    {
      field: "actions",
      flex: 1.2,
      headerName: "Actions",
      actions: [ { type: 'delete' }]
    },
  ];

  const rows = [];

  admin_allreviews &&
    admin_allreviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>
            <div>
              <IoIosStar />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </button>
          </form>

          {admin_allreviews && admin_allreviews.length > 0 ? (
            loading ? (<Loading />) : (
              <div style={{ width: '1600px' }}  >
                <ColumnRow handleAction={deleteReviewHandler} columns={columns} rows={rows} />
              </div>
            )
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
