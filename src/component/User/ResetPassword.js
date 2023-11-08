import React, { useState } from "react";
import "./ResetPassword.css";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import { resetPassword1 } from "../../api/user";
import { useMutation } from "@tanstack/react-query";

const ResetPassword = ({ history, match }) => {
  const alert = useAlert();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // React Query Mutation for Resetting password
  const resetPasswordMutation = useMutation({
    mutationFn: (updateedData) => resetPassword1(updateedData),
    onSuccess: (data) => {
      alert.success("Password Reset Successfully");
      history.push("/login");
    },
    onError: (err) => {
      alert.error(err.response.data.message)
    }
  })

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    const token = match.params.token
    //dispatch(resetPassword({ token, myForm }));
    resetPasswordMutation.mutate({ token, myForm })
  };

  return (
    <>
      <MetaData title="Change Password" />
      <div className="resetPasswordContainer">
        <div className="resetPasswordBox">
          <h2 className="resetPasswordHeading">Update Profile</h2>

          <form
            className="resetPasswordForm"
            onSubmit={resetPasswordSubmit}
          >
            <div>
              <LockOpenIcon />
              <input
                type="password"
                placeholder="New Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            {resetPasswordMutation.isPending ? <input
              type="submit"
              value="Reseting....."
              className="resetPasswordBtn"
            /> : <input
              type="submit"
              value="Reset"
              className="resetPasswordBtn"
            />}
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
