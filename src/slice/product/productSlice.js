import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseURL } from '../../baseAPI';

const initialState = {
    productDetail: {},
    loading: false,
    error: null
}

// thunk for getting prduct detail
export const productData = createAsyncThunk("productdata", async (id, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${baseURL}/api/v1/product/${id}`)
        return data
    } catch (err) {
        return rejectWithValue(err.response.data.message)
    }

})

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
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

    }
})
export const { NEW_REVIEW_RESET, clearErrors } = productSlice.actions



export default productSlice.reducer