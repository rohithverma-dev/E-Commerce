import React, { Fragment, useContext , useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { Link , useNavigate} from "react-router-dom";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Loading from "../layout/Loader/Loader.js"
import SideBar from "./Sidebar";

import noteContext from "../../context/notes/noteContext.js"


const OrderList = () => {
    let history = useNavigate();
    const context = useContext(noteContext);
    const {   admin_allorders  , Admin_getAllOrders , Admin_deleteOrder ,isDeleted , setIsDeleted , loading   } = context;

  const deleteOrderHandler = (id) => {
    Admin_deleteOrder(id);
  };

  useEffect(() => {
    if (isDeleted) {
        console.log("alert.success(`Product Deleted Successfully`)");
        setIsDeleted(false)
        history("/admin/dashboard");
    }
    Admin_getAllOrders();
  }, [isDeleted]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },

    {
      field: "amount",
      headerName: "Amount",
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
            {loading?(<Loading/>):(    <Fragment>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
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

  admin_allorders &&
  admin_allorders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>

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

export default OrderList;
