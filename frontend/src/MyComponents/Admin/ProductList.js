import React, { Fragment,  useContext , useEffect  } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { Link , useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import Loading from "../layout/Loader/Loader.js"
import noteContext from "../../context/notes/noteContext.js"


const ProductList = () => {
    let history = useNavigate();
    const context = useContext(noteContext);
    const { admin_allproducts ,  Admin_getAllProducts,    Admin_deleteProduct , isDeleted , setIsDeleted , loading } = context;
  

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

  }, [ isDeleted]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
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
            {loading? (<Loading/>):(        <Fragment>
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
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
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
