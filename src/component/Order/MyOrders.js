import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./myOrders.css";
import { useSelector } from "react-redux";

import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";
import { useQuery } from "@tanstack/react-query";
import { myOrders1 } from "../../api/order";

const MyOrders = () => {
  const alert = useAlert();
  const { user } = useSelector((state) => state.User);

  // React Query for getting all orders
  const getAllOrders = useQuery({
    queryKey: ['getAllOrders'],
    queryFn: () => myOrders1(),
  })

  if (getAllOrders.isError) {
    alert.error(getAllOrders.error.response.data.message)
  }
  const columns = [
    { field: "id", headerName: "Order ID", flex: 0.2 },

    {
      field: "status",
      headerName: "Status",
      flex: 0.2,
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
      flex: 0.2,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      flex: 0.2,
    },

    {
      field: "actions",
      flex: 0.2,
      headerName: "Actions",
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

  getAllOrders.data &&
    getAllOrders.data.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  return (
    <>
      <MetaData title={`${user.name} - Orders`} />

      {getAllOrders.isPending ? (
        <Loader />
      ) : (
        <div className="myOrdersPage pt-[16rem] md:pt-[8rem] flex">
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
      )}
    </>
  );
};

export default MyOrders;
