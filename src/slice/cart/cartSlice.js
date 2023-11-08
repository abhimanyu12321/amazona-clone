import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { baseURL } from '../../baseAPI';


const initialState = {
    cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    shippingInfo: localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : {},

}

// Add item to cart
export const addItemsToCart = createAsyncThunk("addItemsToCart", async ({ id, quantity }) => {

    const { data } = await axios.get(`${baseURL}/api/v1/product/${id}`)


    return {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.Stock,
        quantity,
    }

})



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
    },
    extraReducers: (builder) => {
        builder
            .addCase(addItemsToCart.fulfilled, (state, action) => {


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
            })

    }
})

// Action creators are generated for each case reducer function
export const { removeItemsFromCart, saveShippingInfo } = cartSlice.actions

export default cartSlice.reducer