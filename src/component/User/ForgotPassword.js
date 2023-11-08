import React, { useState } from "react";
import "./ForgotPassword.css";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword1 } from "../../api/user";

const ForgotPassword = () => {
  const alert = useAlert();
  const [email, setEmail] = useState("");


  // React Query Mutation for forgetting password
  const forgetPasswordMutation = useMutation({
    mutationFn: (updateedData) => forgotPassword1(updateedData),
    onSuccess: (data) => {
      alert.success(data.message);
    },
    onError: (err) => {
      alert.error(err.response.data.message)
    }
  })

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    forgetPasswordMutation.mutate(myForm)
  };

  return (

    <>
      <MetaData title="Forgot Password" />
      <div className="forgotPasswordContainer">
        <div className="forgotPasswordBox">
          <h2 className="forgotPasswordHeading">Forgot Password</h2>

          <form
            className="forgotPasswordForm"
            onSubmit={forgotPasswordSubmit}
          >
            <div className="forgotPasswordEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {forgetPasswordMutation.isPending ? <input
              type="submit"
              value="SENDING....."
              className="forgotPasswordBtn"
            /> : <input
              type="submit"
              value="Send"
              className="forgotPasswordBtn"
            />}
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
