import React, { useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import "./payment.css";
import { clearErrors, createOrder } from "../../slice/order/orderSlice";
import { Typography } from "@material-ui/core";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";


const Payment = ({ history }) => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const dispatch = useDispatch();
  const alert = useAlert();
  const payBtn = useRef(null);


  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);

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
  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    dispatch(createOrder(order));

    payBtn.current.disabled = false;
    history.push("/success");

  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">

        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
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
        </form>

      </div>
    </>
  );
};

export default Payment;
