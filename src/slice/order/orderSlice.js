import { createSlice, createAsyncThunk, } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseURL } from '../../baseAPI';

const initialState = {
    order: {},
    loading: false,
    error: null,
    orders: [],
    orderDetail: {}
}

// thunk for creating order
export const createOrder = createAsyncThunk("createOrder", async (order, { rejectWithValue }) => {

    try {
        const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };

        const { data } = await axios.post(`${baseURL}/api/v1/order/new`,
            order,
            config)
        return data
    } catch (err) {

        return rejectWithValue(err.response.data.message)
    }

})

// thunk for getting my orders
export const myOrders = createAsyncThunk("myOrders", async (arg, { rejectWithValue }) => {

    try {
        const { data } = await axios.get(`${baseURL}/api/v1/orders/me`, { withCredentials: true })
        return data.orders
    } catch (err) {

        return rejectWithValue(err.response.data.message)
    }

})


// thunk for getting orders details
export const getOrderDetails = createAsyncThunk("getOrderDetails", async (id, { rejectWithValue }) => {

    try {
        const { data } = await axios.get(`${baseURL}/api/v1/order/${id}`, { withCredentials: true })
        return data.order
    } catch (err) {

        return rejectWithValue(err.response.data.message)
    }

})


export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state, action) => {
                state.loading = true
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(myOrders.pending, (state, action) => {
                state.loading = true
            })
            .addCase(myOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(myOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(getOrderDetails.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getOrderDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.orderDetail = action.payload;
            })
            .addCase(getOrderDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })





    }
})
export const { clearErrors } = orderSlice.actions

export default orderSlice.reducer;