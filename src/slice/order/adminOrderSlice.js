import { createSlice, createAsyncThunk, } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseURL } from '../../baseAPI'

const initialState = {
    loading: false,
    error: null,
    orders: [],
    isUpdated: false,
    isDeleted: false,
    order: {}
}

// thunk for getting orders
export const getAllOrders = createAsyncThunk("getAllOrders", async (arg, { rejectWithValue }) => {

    try {
        const { data } = await axios.get(`${baseURL}/api/v1/admin/orders`, { withCredentials: true })
        return data.orders
    } catch (err) {

        return rejectWithValue(err.response.data.message)
    }

})

// thunk for updating order
export const updateOrder = createAsyncThunk("updateOrder", async ({ id, myForm }, { rejectWithValue }) => {

    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        };
        const { data } = await axios.put(`${baseURL}/api/v1/admin/order/${id}`, myForm, config)
        return data.success
    } catch (err) {

        return rejectWithValue(err.response.data.message)
    }

})

// thunk for deleting order

export const deleteOrder = createAsyncThunk("deleteOrder", async (id, { rejectWithValue }) => {

    try {

        const { data } = await axios.delete(`${baseURL}/api/v1/admin/order/${id}`, { withCredentials: true })
        return data.success
    } catch (err) {

        return rejectWithValue(err.response.data.message)
    }

})

// thunk for getting orders details
export const getOrderDetailsAdmin = createAsyncThunk("getOrderDetails", async (id, { rejectWithValue }) => {

    try {
        const { data } = await axios.get(`${baseURL}/api/v1/order/${id}`, { withCredentials: true })
        return data.order
    } catch (err) {

        return rejectWithValue(err.response.data.message)
    }

})

export const adminOrderSlice = createSlice({
    name: 'adminorder',
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.error = null
        },
        UPDATE_ORDER_RESET: (state) => {
            state.isUpdated = false
        },
        DELETE_ORDER_RESET: (state) => {
            state.isDeleted = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrders.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(updateOrder.pending, (state, action) => {
                state.loading = true
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.isUpdated = action.payload;
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(deleteOrder.pending, (state, action) => {
                state.loading = true
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.isDeleted = action.payload;
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(getOrderDetailsAdmin.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getOrderDetailsAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(getOrderDetailsAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })


    }
})
export const { clearErrors, UPDATE_ORDER_RESET, DELETE_ORDER_RESET } = adminOrderSlice.actions

export default adminOrderSlice.reducer;
