import React, { useState } from "react";
import "./UpdatePassword.css";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useMutation } from "@tanstack/react-query";
import { updatePassword1 } from "../../api/user";

const UpdatePassword = ({ history }) => {
  const alert = useAlert();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // React Query Mutation for updating password
  const updatePasswordMutation = useMutation({
    mutationFn: (updateedData) => updatePassword1(updateedData),
    onSuccess: (data) => {
      alert.success("Password Updated Successfully");
      history.push("/account");
    },
    onError: (err) => {
      alert.error(err.response.data.message)
    }
  })

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    updatePasswordMutation.mutate(myForm)
  };

  return (

    <>
      <MetaData title="Change Password" />
      <div className="updatePasswordContainer">
        <div className="updatePasswordBox">
          <h2 className="updatePasswordHeading">Update Password</h2>

          <form
            className="updatePasswordForm"
            onSubmit={updatePasswordSubmit}
          >
            <div className="loginPassword">
              <VpnKeyIcon />
              <input
                type="password"
                placeholder="Old Password"
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className="loginPassword">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="New Password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="loginPassword">
              <LockIcon />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {updatePasswordMutation.isPending ? <input
              type="submit"
              value="updating......"
              className="updatePasswordBtn"
              disabled={updatePasswordMutation.isPending}
            /> : <input
              type="submit"
              value="Change"
              className="updatePasswordBtn"
            />}
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
