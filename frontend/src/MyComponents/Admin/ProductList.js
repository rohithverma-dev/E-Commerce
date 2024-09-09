import React, { Fragment, useContext, useEffect } from "react";
import "./productList.css";
// import "./productListCss.css";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import Loading from "../layout/Loader/Loader.js"
import noteContext from "../../context/notes/noteContext.js"
import ColumnRow from "../../CustomComponents/ColumnRowTable/ColumnRow.js"


const ProductList = () => {
  let history = useNavigate();
  const context = useContext(noteContext);
  const { admin_allproducts, Admin_getAllProducts, Admin_deleteProduct, isDeleted, setIsDeleted, loading } = context;


  const deleteProductHandler = (id) => {
    Admin_deleteProduct(id);
  };


  useEffect(() => {
    Admin_getAllProducts()
    if (isDeleted) {
      console.log("alert.success(`Product Deleted Successfully`)");
      setIsDeleted(false)
      history("/admin/dashboard");
    }
  }, [isDeleted]);

  const columns = [
    { field: "id", headerName: "Product ID", flex: 2 },
    { field: "name", headerName: "Name", flex: 1.5, },
    { field: "stock", headerName: "Stock", flex: 1, },
    { field: "price", headerName: "Price", flex: 1, },
    {
      field: "actions",
      flex: 1.2,
      headerName: "Actions",
      actions: [{ type: 'edit', link: '/admin/product' }, { type: 'delete' }]
    },
  ];

  const rows = [];

  admin_allproducts &&
    admin_allproducts.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />
      <div className="dashboard">
        <div className="forsidebar" >
          <SideBar />
        </div>
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>
          <div className="styleTable" >
            <ColumnRow handleAction={deleteProductHandler} columns={columns} rows={rows} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
