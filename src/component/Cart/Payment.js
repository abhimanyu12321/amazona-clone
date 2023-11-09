import React, { useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import "./payment.css";
import { Typography } from "@material-ui/core";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder1 } from "../../api/order";
import Loader from "../layout/Loader/Loader";


const Payment = ({ history }) => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const queryClient = useQueryClient()
  const alert = useAlert();
  const payBtn = useRef(null);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);


  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
    paymentInfo: {
      id: random(111111, 99999999),
      status: "Successfull",
    }
  };

  console.log(order)

  // React Query Mutation for Creating a Order
  const createOrderMutation = useMutation({
    mutationFn: (Data) => createOrder1(Data),
    onSuccess: (data) => {
      alert.success("Order placed Successfully");
      queryClient.invalidateQueries({ queryKey: ['getAllOrders'] })
      history.push("/success");
    },
    onError: (err) => {
      alert.error(err.response.data.message)
    }
  })
  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
    createOrderMutation.mutate(order)
    payBtn.current.disabled = false;
  };

  return (
    <>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">

        {createOrderMutation.isPending ? <Loader /> : <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <input className="paymentInput" type="number" required placeholder="Enter 12 digit Card Number" maxLength="12" minLength="12" />
          </div>
          <div>
            <EventIcon />
            <input className="paymentInput" required placeholder="Expiry year" type="number" />
          </div>
          <div>
            <VpnKeyIcon />
            <input className="paymentInput" required placeholder="cvv" type="number" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>}

      </div>
    </>
  );
};

export default Payment;
