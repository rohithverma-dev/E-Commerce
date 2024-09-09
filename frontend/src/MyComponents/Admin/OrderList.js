import React, { Fragment, useContext , useEffect } from "react";
import "./productList.css";
import { Link , useNavigate} from "react-router-dom";
import MetaData from "../layout/MetaData";
import Loading from "../layout/Loader/Loader.js"
import SideBar from "./Sidebar";

import noteContext from "../../context/notes/noteContext.js"
import ColumnRow from "../../CustomComponents/ColumnRowTable/ColumnRow.js";


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
    { field: "id", headerName: "Order ID", flex: 2, },
    { field: "status", headerName: "Status", flex: 1.5, },
    { field: "itemsQty", headerName: "Items Qty", flex: 1, },
    { field: "amount", headerName: "Amount", flex: 1, },
    {
      field: "actions",
      flex: 1.2,
      headerName: "Actions",
      actions: [{ type: 'edit', link: '/admin/order' }, { type: 'delete' }]
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

          <div style={{ width: '1600px' }}  >
            <ColumnRow handleAction={deleteOrderHandler} columns={columns} rows={rows} />
          </div>
          
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;
