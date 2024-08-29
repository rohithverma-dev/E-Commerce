import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import "./productReviews.css";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import DeleteIcon from "@material-ui/icons/Delete";
import Loading from "../layout/Loader/Loader.js"
import Star from "@material-ui/icons/Star";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SideBar from "./Sidebar";
import noteContext from "../../context/notes/noteContext.js"


const ProductReviews = () => {
  let history = useNavigate();
  const context = useContext(noteContext);
  const { Admin_getAllReviews, admin_allreviews, Admin_deleteReview, isDeleted, setIsDeleted, loading } = context;


  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    Admin_deleteReview(reviewId, productId);
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
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,

      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (

          <Fragment>
            {loading ? (<Loading />) : (
              <Fragment>
                <Button
                  onClick={() =>
                    deleteReviewHandler(params.getValue(params.id, "id"))
                  }
                >
                  <DeleteIcon />
                </Button>
              </Fragment>)}
          </Fragment>


        );
      },
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
              <Star />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </Button>
          </form>



          {admin_allreviews && admin_allreviews.length > 0 ? (
            loading ? (<Loading />) : (
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="productListTable"
                autoHeight
              />
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
