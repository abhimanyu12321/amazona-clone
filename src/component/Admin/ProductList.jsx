import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProduct1, getAdminProduct1 } from "../../api/product";
import Loader from "../layout/Loader/Loader";


const ProductList = ({ history }) => {
  const alert = useAlert();
  const queryClient = useQueryClient()


  // React Query for getting all products
  const getProductsAdminQuery = useQuery({
    queryKey: ['getProductsAdminQuery'],
    queryFn: () => getAdminProduct1(),
  })

  // React Query Mutation for Resetting password
  const deleteProductMutation = useMutation({
    mutationFn: (id) => deleteProduct1(id),
    onSuccess: (data) => {
      alert.success("Product Deleted Successfully");
      queryClient.invalidateQueries({ queryKey: ['getProductsAdminQuery'] })
      history.push("/admin/dashboard");

    },
    onError: (err) => {
      alert.error(err.response.data.message)
    }
  })

  const deleteProductHandler = (id) => {
    deleteProductMutation.mutate(id)
  };

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 100, flex: 0.3 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 100,
      flex: 0.3,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 100,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 100,
      flex: 0.3,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 100,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
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
          </>
        );
      },
    },
  ];

  const rows = [];

  getProductsAdminQuery.data &&
    getProductsAdminQuery.data.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        {getProductsAdminQuery.isPending ? <Loader /> : <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>}
      </div>
    </>
  );
};

export default ProductList;