import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseURL } from '../../baseAPI';

const initialState = {
    products: [],
    loading: false,
    error: null,
    productsCount: 0,
    productDetail: {},
    resultPerPage: 4,
    success: false

}

// thunk for getting all products
export const getProducts = createAsyncThunk("getproducts", async ({ keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0 }, { rejectWithValue }) => {

    let link = `${baseURL}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

    if (category) {
        link = `${baseURL}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
    }
    const { data } = await axios.get(link)
    return data


})

// thunk for getting prduct detail
export const productData = createAsyncThunk("productdata", async (id, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${baseURL}/api/v1/product/${id}`)
        return data
    } catch (err) {
        return rejectWithValue(err.response.data.message)
    }

})


// thunk for Adding new review
export const newReview = createAsyncThunk("newReview", async (myForm, { rejectWithValue }) => {
    try {
        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        };
        const { data } = await axios.put(`${baseURL}/api/v1/review`, myForm, config)
        return data.success
    } catch (err) {
        return rejectWithValue(err.response.data.message)
    }

})

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        NEW_REVIEW_RESET: (state) => {
            state.success = false
        },
        clearErrors: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products
                state.productsCount = action.payload.productsCount
                state.resultPerPage = action.payload.resultPerPage

            })
            .addCase(getProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
            .addCase(productData.pending, (state, action) => {
                state.loading = true
            })
            .addCase(productData.fulfilled, (state, action) => {
                state.loading = false;
                state.productDetail = action.payload.product
            })
            .addCase(productData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(newReview.pending, (state, action) => {
                state.loading = true
            })
            .addCase(newReview.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload
            })
            .addCase(newReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })

    }
})
export const { NEW_REVIEW_RESET, clearErrors } = productSlice.actions



export default productSlice.reducer