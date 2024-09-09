import { useParams } from "react-router-dom";
import React, { Fragment, useContext, useEffect, useState } from "react";
import MetaData from "../layout/MetaData.js";
import ProductCard from "../Home/ProductCard.js";
import Pagination from "react-js-pagination";
import noteContext from "../../context/notes/noteContext.js";
import Loading from "../layout/Loader/Loader.js"
import "./Products.css";
import SingleSlider from "../../CustomComponents/SingleSlider/SingleSlider.js"
import DoubleSlider from "../../CustomComponents/DoubleSlider/DoubleSlider.js"


const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones"
];



function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  // const [price, setPrice] = useState([250,750])
  const [ratings, setRatings] = useState(0);
  const [category, setCategory] = useState("");
  const { keyword } = useParams();
  const context = useContext(noteContext);
  let { getAllProducts, Count, filteredProducts, PerPage, products, loading } = context;


  useEffect(() => {
    // setCategory("")
    // console.log("useEffect",category);
    getAllProducts(keyword, currentPage, price, category, ratings);
    // eslint-disable-next-line
  }, [keyword, currentPage, price, category, ratings]);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
    // console.log(e);
  };
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  return (

    <Fragment>
      {loading ? (<Loading />) : (<>
        <MetaData title="E-Commerce  ALL PRODUCTS" />
        <h2 className="productsHeading">Products</h2>
        <div className="products">
          {products &&
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>

        <div className="filterBox">
          
          <h3 >Price</h3>
          <div style={{ width: 180, height: 120 }} >
            <DoubleSlider min={0} max={75000} diff={10000} price={price} setPrice={setPrice} />
          </div>




          <h3 >Categories</h3>
          <ul className="categoryBox">
            {categories.map((category) => (
              <li
                className="category-link"
                key={category}
                onClick={() => setCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>


          <h3 >Ratings Above</h3>
          <div className="ratingAbove"  >
            <SingleSlider rating={ratings} setRating={setRatings} min={0} max={5} />
          </div>

        </div>


        {PerPage < filteredProducts && (
          <div className="paginationBox">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={PerPage}
              // totalItemsCount={Count}
              totalItemsCount={filteredProducts}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </div>
        )}
      </>)}
    </Fragment>

  );
}

export default Products;
