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
import { deleteUser1, getAllUsers1 } from "../../api/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../layout/Loader/Loader";

const UsersList = ({ history }) => {
  const queryClient = useQueryClient()
  const alert = useAlert();

  // React Query Mutation for Resetting password
  const deleteUserMutation = useMutation({
    mutationFn: (id) => deleteUser1(id),
    onSuccess: (data) => {
      alert.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['getUsersAdminQuery'] })
      history.push("/admin/users");
    },
    onError: (err) => {
      alert.error(err.response.data.message)
    }
  })

  const deleteUserHandler = (id) => {
    deleteUserMutation.mutate(id)
  };

  // React Query for getting all users
  const getUsersAdminQuery = useQuery({
    queryKey: ['getUsersAdminQuery'],
    queryFn: () => getAllUsers1(),
  })

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
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
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
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

  getUsersAdminQuery.data &&
    getUsersAdminQuery.data.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <>
      <MetaData title={`ALL USERS - Admin`} />


      <div className="dashboard">
        <SideBar />
        {getUsersAdminQuery.isPending ? <Loader /> : <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

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

export default UsersList;
