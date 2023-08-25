import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseURL } from '../../baseAPI'

const initialState = {
    products: [],
    loading: false,
    error: null,
    product: {},
    success: false,
    isDeleted: false,
    isUpdated: false,
    reviews: [],
    isRDeleted: false,
}


// thunk for getting Admin products
export const getAdminProduct = createAsyncThunk("getAdminProduct", async (arg, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${baseURL}/api/v1/admin/products`, { withCredentials: true })
        return data.products
    } catch (err) {
        return rejectWithValue(err.response.data.message)
    }

})

// thunk for Adding new Product
export const createProduct = createAsyncThunk("createProduct", async (myForm, { rejectWithValue }) => {
    try {

        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        };

        const { data } = await axios.post(`${baseURL}/api/v1/admin/product/new`, myForm, config)
        return data
    } catch (err) {
        return rejectWithValue(err.response.data.message)
    }

})

//thunk for deleting product
export const deleteProduct = createAsyncThunk("deleteProduct", async (id, { rejectWithValue }) => {
    try {

        const { data } = await axios.delete(`${baseURL}/api/v1/admin/product/${id}`, { withCredentials: true })
        return data.success
    } catch (err) {
        return rejectWithValue(err.response.data.message)
    }

})

//thunk for updating a product
export const updateProduct = createAsyncThunk("updateProduct", async ({ id, myForm }, { rejectWithValue }) => {
    try {
        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        };

        const { data } = await axios.put(`${baseURL}/api/v1/admin/product/${id}`, myForm, config)
        return data.success
    } catch (err) {
        return rejectWithValue(err.response.data.message)
    }

})


//thunk for getting reviews Admin
export const getAllReviews = createAsyncThunk("getAllReviews", async (id, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${baseURL}/api/v1/reviews?id=${id}`, { withCredentials: true })
        return data.reviews
    } catch (err) {
        return rejectWithValue(err.response.data.message)
    }

})

//thunk for deleting a Product review
export const deleteReviews = createAsyncThunk("deleteReviews", async ({ reviewId, productId }, { rejectWithValue }) => {
    try {

        const { data } = await axios.delete(`${baseURL}/api/v1/reviews?id=${reviewId}&productId=${productId}`, { withCredentials: true })
        return data.success
    } catch (err) {
        return rejectWithValue(err.response.data.message)
    }

})



export const AdminProductSlice = createSlice({
    name: 'Adminproduct',
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.error = null
        },
        NEW_PRODUCT_RESET: (state) => {
            state.success = false
        },
        DELETE_PRODUCT_RESET: (state) => {
            state.isDeleted = false
        },
        UPDATE_PRODUCT_RESET: (state) => {
            state.isUpdated = false
        },
        DELETE_REVIEW_RESET: (state) => {
            state.isRDeleted = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAdminProduct.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getAdminProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload
            })
            .addCase(getAdminProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(createProduct.pending, (state, action) => {
                state.loading = true
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload.product
                state.success = action.payload.success
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(deleteProduct.pending, (state, action) => {
                state.loading = true
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.isDeleted = action.payload
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(updateProduct.pending, (state, action) => {
                state.loading = true
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.isUpdated = action.payload
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(getAllReviews.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getAllReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload
            })
            .addCase(getAllReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(deleteReviews.pending, (state, action) => {
                state.loading = true
            })
            .addCase(deleteReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.isRDeleted = action.payload
            })
            .addCase(deleteReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })


    }
})
export const { clearErrors, NEW_PRODUCT_RESET, DELETE_PRODUCT_RESET, UPDATE_PRODUCT_RESET, DELETE_REVIEW_RESET } = AdminProductSlice.actions
export default AdminProductSlice.reducer
