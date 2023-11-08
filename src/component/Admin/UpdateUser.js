import React, { useState } from "react";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SideBar from "./Sidebar";
import Loader from "../layout/Loader/Loader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserDetails1, updateUser1 } from "../../api/user";

const UpdateUser = ({ history, match }) => {
  const alert = useAlert();
  const queryClient = useQueryClient()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  // React Query for getting all users
  const getUserDetailAdminQuery = useQuery({
    queryKey: ['getUserDetailAdminQuery'],
    queryFn: () => getUserDetails1(match.params.id),
  })

  const id = match.params.id;

  // React Query Mutation for Resetting password
  const updateUserMutation = useMutation({
    mutationFn: (updatedData) => updateUser1(updatedData),
    onSuccess: (data) => {
      alert.success("User Updated Successfully");
      queryClient.invalidateQueries({ queryKey: ['getUserDetailAdminQuery'] })
      history.push("/admin/users");
    },
    onError: (err) => {
      alert.error(err.response.data.message)
    }
  })

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);
    updateUserMutation.mutate({ id, myForm })
  };

  return (
    <>
      <MetaData title="Update User" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {getUserDetailAdminQuery.isPending ? (
            <Loader />
          ) : (
            <form
              className="createProductForm"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>

              <div>
                <PersonIcon />
                <input
                  type="text"
                  placeholder={getUserDetailAdminQuery.data.name}
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder={getUserDetailAdminQuery.data.email}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)} required>
                  <option value="">{getUserDetailAdminQuery.data ? getUserDetailAdminQuery.data.role : "Choose Role"}</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
              >
                {updateUserMutation.isPending ? "Updating...." : "Update"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
