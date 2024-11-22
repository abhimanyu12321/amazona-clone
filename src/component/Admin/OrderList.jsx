import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteOrder1, getAllOrders1 } from "../../api/order";
import Loader from "../layout/Loader/Loader";

const OrderList = ({ history }) => {
  const queryClient = useQueryClient()
  const alert = useAlert();



  // React Query Mutation for deleting a order for Admin
  const deleteOrderAdminMutation = useMutation({
    mutationFn: (id) => deleteOrder1(id),
    onSuccess: (data) => {
      alert.success("Order Deleted Successfully");
      queryClient.invalidateQueries({ queryKey: ['getAllOrdersAdminQuery'] })
      history.push("/admin/orders");

    },
    onError: (err) => {
      alert.error(err.response.data.message)
    }
  })

  const deleteOrderHandler = (id) => {
    deleteOrderAdminMutation.mutate(id)
  };

  // React Query for getting all orders for Admin
  const getAllOrdersAdminQuery = useQuery({
    queryKey: ['getAllOrdersAdminQuery'],
    queryFn: () => getAllOrders1(),
  })

  if (getAllOrdersAdminQuery.isError) {
    alert.error(getAllOrdersAdminQuery.error.message)
  }


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
          <>
            {/* <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link> */}

            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  getAllOrdersAdminQuery.data &&
    getAllOrdersAdminQuery.data.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <>
      <MetaData title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>

          {getAllOrdersAdminQuery.isPending ? <Loader /> : <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />}
        </div>
      </div>
    </>
  );
};

export default OrderList;
