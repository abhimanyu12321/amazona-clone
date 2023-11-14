import React from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCartAction, removeItemsFromCart } from "../../slice/cart/cartSlice";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { addItemsToCart1 } from "../../api/order";

const Cart = ({ history }) => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);
    // React Query mutation for adding Item to cart
    const addItemToCartMutation = useMutation({
        mutationFn: (item) => {
            return addItemsToCart1(item)
        },
        onSuccess: (data) => {
            dispatch(addItemsToCartAction(data))
        },
        onError: () => {
            alert.error(addItemToCartMutation.error.message)
        }
    })

    const increaseQuantity = (id, quantity, stock) => {
        quantity = quantity + 1;
        if (stock < quantity) {
            return;
        }
        addItemToCartMutation.mutate({ id, quantity })
    };

    const decreaseQuantity = (id, quantity) => {
        quantity = quantity - 1;
        if (1 > quantity) {
            return;
        }
        addItemToCartMutation.mutate({ id, quantity })
    };

    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id));
    };

    const checkoutHandler = () => {
        history.push("/login?redirect=shipping");
    };

    return (
        <>
            {cartItems.length === 0 ? (
                <div className="emptyCart">
                    <RemoveShoppingCartIcon />

                    <Typography>No Product in Your Cart</Typography>
                    <Link to="/products">View Products</Link>
                </div>
            ) : (
                <>
                    <div className="cartPage pt-[10rem] md:pt-[6rem]">
                        <div className="cartHeader">
                            <p>Product</p>
                            <p>Quantity</p>
                            <p>Subtotal</p>
                        </div>

                        {cartItems &&
                            cartItems.map((item) => (
                                <div className="cartContainer" key={item.product}>
                                    <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                                    <div className="cartInput">
                                        <button
                                            onClick={() =>
                                                decreaseQuantity(item.product, item.quantity)
                                            }
                                        >
                                            -
                                        </button>
                                        <input type="number" value={item.quantity} readOnly />
                                        <button
                                            onClick={() =>
                                                increaseQuantity(
                                                    item.product,
                                                    item.quantity,
                                                    item.stock
                                                )
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p className="cartSubtotal">{`₹${item.price * item.quantity
                                        }`}</p>
                                </div>
                            ))}

                        <div className="cartGrossProfit">
                            <div></div>
                            <div className="cartGrossProfitBox">
                                <p>Gross Total</p>
                                <p>{`₹${cartItems.reduce(
                                    (acc, item) => acc + item.quantity * item.price,
                                    0
                                )}`}</p>
                            </div>
                            <div></div>
                            <div className="checkOutBtn">
                                <button onClick={checkoutHandler} >Check Out</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Cart;
