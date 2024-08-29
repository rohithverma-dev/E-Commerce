import React, { Fragment, useContext, useEffect } from "react";
import ProductCard from "./ProductCard.js";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import MetaData from "../layout/MetaData.js";
import noteContext from "../../context/notes/noteContext.js";
import Loading from "../layout/Loader/Loader.js"


function Home() {
  const context = useContext(noteContext);
  let { getAllProducts , products , loading } = context;
  // getAllProducts()

  useEffect(() => { 
    getAllProducts()
     // eslint-disable-next-line  
  }, [])
  
  return (
              

            
<Fragment>
{loading?(<Loading/>):(  <>
      <MetaData title="E-Commerce  HOME" />
      <div className="banner">
        <p>Welcome To Ecommerece</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>
        <a href="#homeHeading">
          <button>
            Scroll
             <CgMouse />
          </button>
        </a>
      </div>
      <h2 className="homeHeading" id="homeHeading">
        Featured Products
      </h2>
      <div className="container" id="container">
        {products &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
   
      </div>
    </>)}
</Fragment>

  
  );
}

export default Home;
