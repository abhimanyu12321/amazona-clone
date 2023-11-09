import React from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import MetaData from "../layout/MetaData";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers1 } from "../../api/user.js";
import { getAdminProduct1 } from "../../api/product.js";
import { myOrders1 } from "../../api/order.js";

const Dashboard = () => {

  // React Query for getting all users
  const getUsersAdminQuery = useQuery({
    queryKey: ['getUsersAdminQuery'],
    queryFn: () => getAllUsers1(),
  })


  // React Query for getting all products
  const getProductsAdminQuery = useQuery({
    queryKey: ['getProductsAdminQuery'],
    queryFn: () => getAdminProduct1(),
  })

  // React Query for getting all orders
  const getAllOrders = useQuery({
    queryKey: ['getAllOrders'],
    queryFn: () => myOrders1(),
  })

  let outOfStock = 0;

  getProductsAdminQuery.data &&
    getProductsAdminQuery.data.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  let totalAmount = 0;
  getAllOrders.data &&
    getAllOrders.data.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, 56000],
      },
    ],
  };


  const doughnutState = getProductsAdminQuery.isSuccess ? {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, getProductsAdminQuery.data.length - outOfStock],
      },
    ],
  } : {}



  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{getProductsAdminQuery.data && getProductsAdminQuery.data.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{getAllOrders.data && getAllOrders.data.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{getUsersAdminQuery.data && getUsersAdminQuery.data.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          {getProductsAdminQuery.data && <Doughnut data={doughnutState} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
