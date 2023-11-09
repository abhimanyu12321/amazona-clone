import { createSlice } from '@reduxjs/toolkit'



const initialState = {
    cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    shippingInfo: localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : {},

}


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        removeItemsFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((i) => i.product !== action.payload);

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        saveShippingInfo: (state, action) => {

            state.shippingInfo = action.payload

            localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));
        },
        addItemsToCartAction: (state, action) => {
            const item = action.payload;

            const isItemExist = state.cartItems.find(
                (i) => i.product === item.product
            );

            if (isItemExist) {
                state.cartItems = state.cartItems.filter((i) => i.product !== item.product);
                state.cartItems.push(item)
            }
            else {
                state.cartItems.push(item)
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        }
    },
})

// Action creators are generated for each case reducer function
export const { removeItemsFromCart, saveShippingInfo, addItemsToCartAction } = cartSlice.actions

export default cartSlice.reducer