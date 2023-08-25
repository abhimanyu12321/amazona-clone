import { createSlice, createAsyncThunk, } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseURL } from '../../baseAPI';

const initialState = {
    isUpdated: false,
    loading: false,
    error: null,
    message: "",
    resetPasswordCheck: false
}

// update profile
export const updateProfile = createAsyncThunk("updateProfile", async (myForm, { rejectWithValue }) => {

    try {
        const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };

        const { data } = await axios.put(`${baseURL}/api/v1/me/update`,
            myForm,
            config)
        return data
    } catch (err) {

        return rejectWithValue(err.response.data.message)
    }

})


// update password
export const updatePassword = createAsyncThunk("updatePassword", async (myForm, { rejectWithValue }) => {

    try {
        const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };

        const { data } = await axios.put(`${baseURL}/api/v1/password/update`,
            myForm,
            config)
        return data
    } catch (err) {

        return rejectWithValue(err.response.data.message)
    }

})

//forgot password

export const forgotPassword = createAsyncThunk("forgotPassword", async (myForm, { rejectWithValue }) => {

    try {
        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(`${baseURL}/api/v1/password/forgot`,
            myForm,
            config)
        return data
    } catch (err) {

        return rejectWithValue(err.response.data.message)
    }

})


// Reset password
export const resetPassword = createAsyncThunk("resetPassword", async ({ token, myForm }, { rejectWithValue }) => {

    try {
        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(`${baseURL}/api/v1/password/reset/${token}`,
            myForm,
            config)
        return data
    } catch (err) {

        return rejectWithValue(err.response.data.message)
    }

})

export const updateUserSlice = createSlice({
    name: 'updateuser',
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.error = null
        },
        UPDATE_PROFILE_RESET: (state) => {
            state.isUpdated = false
        },
        UPDATE_PASSWORD_RESET: (state) => {
            state.isUpdated = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateProfile.pending, (state, action) => {
                state.loading = true
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.isUpdated = action.payload.success
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(updatePassword.pending, (state, action) => {
                state.loading = true
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.loading = false;
                state.isUpdated = action.payload.success
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(forgotPassword.pending, (state, action) => {
                state.loading = true
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(resetPassword.pending, (state, action) => {
                state.loading = true
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.resetPasswordCheck = action.payload.success
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
    }
})
export const { clearErrors, UPDATE_PROFILE_RESET, UPDATE_PASSWORD_RESET } = updateUserSlice.actions



export default updateUserSlice.reducer;