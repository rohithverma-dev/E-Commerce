import React, { Fragment, useEffect, useState, useContext } from "react";
import "./newProduct.css";
import MetaData from "../layout/MetaData";
import { Link, useNavigate } from "react-router-dom";
import noteContext from "../../context/notes/noteContext.js"
import Loading from "../layout/Loader/Loader.js"
import SideBar from "./Sidebar";


import { LiaSpellCheckSolid } from "react-icons/lia";
import { FaDollarSign } from "react-icons/fa";
import { MdCategory, MdDescription } from "react-icons/md";
import { BsStack } from "react-icons/bs";

const NewProduct = () => {
  let history = useNavigate();
  const context = useContext(noteContext);
  const { Admin_createProduct, isUpdated, setIsUpdated, loading } = context;



  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  useEffect(() => {

    if (isUpdated) {
      console.log(`alert.success("Product Created Successfully");`);
      setIsUpdated(false)
      history("/admin/dashboard");
    }
  }, [isUpdated]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    Admin_createProduct(myForm);
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (

    // <Fragment>
    //   {loading? (<Loading/>):(
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (<Loading />) : (
            <form
              className="createProductForm"
              encType="multipart/form-data"
              onSubmit={createProductSubmitHandler}
            >
              <h1>Create Product</h1>

              <div>
                <LiaSpellCheckSolid />
                <input
                  type="text"
                  placeholder="Product Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <FaDollarSign />
                <input
                  type="number"
                  placeholder="Price"
                  required
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div>
                <MdDescription />

                <textarea
                  placeholder="Product Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  cols="30"
                  rows="1"
                ></textarea>
              </div>

              <div>
                <MdCategory />

                <select onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Choose Category</option>
                  {categories.map((cate) => (
                    <option key={cate} value={cate}>
                      {cate}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <BsStack />
                <input
                  type="number"
                  placeholder="Stock"
                  required
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div id="createProductFormFile">
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={createProductImagesChange}
                  multiple
                />
              </div>

              <div id="createProductFormImage">
                {imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt="Product Preview" />
                ))}
              </div>

              <button
                id="createProductBtn"
                type="submit"
                disabled={loading ? true : false}
              >
                Create
              </button>
            </form>
          )}

        </div>
      </div>
      {/* </Fragment>)} */}
    </Fragment>


  );
};

export default NewProduct;
