import React, { Fragment, useContext, useEffect } from "react";
import "./myOrders.css";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import noteContext from "../../context/notes/noteContext.js"
import Loading from "../layout/Loader/Loader.js"
import ColumnRow from "../../CustomComponents/ColumnRowTable/ColumnRow.js";


const MyOrders = () => {
    let history = useNavigate();
    const context = useContext(noteContext);
    const { myorders, user, f_myOrders, isUpdated, setIsUpdated, loading } = context;

    const columns = [
        { field: "id", headerName: "Order ID", flex: 2 },
        { field: "status", headerName: "Status", flex: 1.5, },
        { field: "itemsQty", headerName: "Items Qty", flex: 1, },
        { field: "amount", headerName: "Amount", flex: 1.2, },
        {
          field: "actions",
          flex: 1.2,
          headerName: "Actions",
          actions: [{ type: 'edit', link: '/order' }, ]
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
            {loading ? (<Loading />) : (<Fragment>
                <div style={{width: "100%" , overflow:'auto'  }} className="myOrdersPage">
                    <div style={{ width: '1300px'  }}  >
                        <ColumnRow handleAction={()=>{console.log("hiii")} } columns={columns} rows={rows} />
                    </div>
                    <h3 style={{ fontWeight: 'normal' }} id="myOrdersHeading">{user.name}'s Orders</h3>
                </div>
            </Fragment>)}
        </Fragment>
    );
};

export default MyOrders;
