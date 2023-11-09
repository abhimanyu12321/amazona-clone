import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productReviews.css";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import DeleteIcon from "@material-ui/icons/Delete";
import Star from "@material-ui/icons/Star";
import SideBar from "./Sidebar";
import { useMutation } from "@tanstack/react-query";
import { deleteReviews1, getAllReviews1 } from "../../api/product";

const ProductReviews = ({ history }) => {
  const alert = useAlert();
  const [productId, setProductId] = useState("");

  // React Query Mutation for getting product Reviews
  const getProductReviewsMutation = useMutation({
    mutationFn: (id) => getAllReviews1(id),
    onSuccess: (data) => {
      alert.success("Reviews found Successfully");
    },
    onError: (err) => {
      alert.error(err.response.data.message)
    }
  })

  // React Query Mutation for updating product
  const deleteProductReviewMutation = useMutation({
    mutationFn: (ids) => deleteReviews1(ids),
    onSuccess: (data) => {
      alert.success("Review Deleted Successfully");
      history.push("/admin/reviews");
    },
    onError: (err) => {
      alert.error(err.response.data.message)
    }
  })

  const deleteReviewHandler = (reviewId) => {
    deleteProductReviewMutation.mutate({ reviewId, productId })
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    getProductReviewsMutation.mutate(productId)
  };


  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,

      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
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
            <Button
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, "id"))
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

  getProductReviewsMutation.data &&
    getProductReviewsMutation.data.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  return (
    <>
      <MetaData title={`ALL REVIEWS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

            <div>
              <Star />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                getProductReviewsMutation.isPending ? true : false || productId === "" ? true : false
              }
            >
              {getProductReviewsMutation.isPending ? "Searching....." : "Search"}
            </Button>
          </form>

          {getProductReviewsMutation.data &&
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          }
        </div>
      </div>
    </>
  );
};

export default ProductReviews;
