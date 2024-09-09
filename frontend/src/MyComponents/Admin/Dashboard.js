import React, { useEffect , useContext, Fragment } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import noteContext from "../../context/notes/noteContext.js"
import Loading from "../layout/Loader/Loader.js"
import MetaData from "../layout/MetaData";

import Chart from 'chart.js/auto';        
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);

const Dashboard = () => {
  const context = useContext(noteContext);
  const { admin_allproducts , admin_allorders , admin_allusers , Admin_getAllProducts , Admin_getAllUsers , Admin_getAllOrders , loading } = context;

  let outOfStock = 0;

  admin_allproducts &&
  admin_allproducts.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    Admin_getAllProducts();
    Admin_getAllOrders();
    Admin_getAllUsers();
  }, []);

  let totalAmount = 0;
  admin_allorders &&
  admin_allorders.forEach((item) => {
      totalAmount += item.totalPrice;
    });
    
    const lineState = {
      labels: ["Initial Amount", "Amount Earned"],
      datasets: [
        {
          label: "TOTAL AMOUNT",
          backgroundColor: ["tomato"],
          hoverBackgroundColor: ["rgb(197, 72, 49)"],
          data: [0, totalAmount],
        },
      ],
    };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, admin_allproducts.length - outOfStock],
      },
    ],
  };

  return (

    <Fragment>
      {console.log("dashboard")}
      {loading? (<Loading/>):(  <Fragment>
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <h1 component="h1">Dashboard</h1>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{admin_allproducts && admin_allproducts.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{admin_allorders && admin_allorders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{admin_allusers && admin_allusers.length}</p>
            </Link>
          </div>
        </div>

        {/* <div className="lineChart"> */}
          <Line className="lineChart" data={lineState} />
        {/* </div> */}

        {/* <div className="doughnutChart"> */}
          <Doughnut className="doughnutChart" data={doughnutState} />
        {/* </div> */}
      </div>
    </div>
    </Fragment>)}
    </Fragment>

 
  );
};

export default Dashboard;
