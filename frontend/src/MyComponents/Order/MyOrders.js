import React, { Fragment, useContext, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./myOrders.css";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";
import noteContext from "../../context/notes/noteContext.js"
import Loading from "../layout/Loader/Loader.js"


const MyOrders = () => {
    let history = useNavigate();
    const context = useContext(noteContext);
    const { myorders, user, f_myOrders, isUpdated, setIsUpdated , loading  } = context;


    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.6 },
        {
            field: "status",
            headerName: "Status",
            minWidth: 100,
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
            minWidth: 100,
            flex: 0.3,
        },

        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 100,
            flex: 0.3,
        },

        {
            field: "actions",
            flex: 0.8,
            headerName: "Actions",
            minWidth: 100,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Link to={`/order/${params.getValue(params.id, "id")}`}>
                        <LaunchIcon />
                    </Link>
                );
            },
        },
    ];
    const rows = [];

    myorders &&
        myorders.forEach((item, index) => {
            rows.push({
                itemsQty: item.orderItems.length,
                id: item._id,
                status: item.orderStatus,
                amount: item.totalPrice,
            });
        });

    useEffect(() => {
        f_myOrders();
    }, []);

    return (
   
          <Fragment>
            <MetaData title={`${user.name} - Orders`} />
          {loading?(<Loading/>):( <Fragment>

           
                <div className="myOrdersPage">
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="myOrdersTable"
                        autoHeight
                    />
                    <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
                </div>
        </Fragment>)}
         </Fragment>
       
    );
};

export default MyOrders;
