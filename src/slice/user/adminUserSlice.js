import { createSlice, createAsyncThunk, } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseURL } from '../../baseAPI'

const initialState = {
    user: {},
    loading: false,
    error: null,
    users: [],
    isUpdated: false,
    isDeleted: false,
    message: ""

}

// thunk for getting all user Admin
export const getAllUsers = createAsyncThunk("getAllUsers", async (arg, { rejectWithValue }) => {

    try {
        const { data } = await axios.get(`${baseURL}/api/v1/admin/users`, { withCredentials: true })
        return data.users
    } catch (err) {
        return rejectWithValue(err.response.data.message)
    }

})

//thunk for getting user detail Admin
export const getUserDetails = createAsyncThunk("getUserDetails", async (id, { rejectWithValue }) => {

    try {
        const { data } = await axios.get(`${baseURL}/api/v1/admin/user/${id}`, { withCredentials: true })
        return data.user
    } catch (err) {
        return rejectWithValue(err.response.data.message)
    }

})


// thunk for updating a user ADMIN
export const updateUser = createAsyncThunk("updateUser", async ({ id, myForm }, { rejectWithValue }) => {

    try {
        const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };

        const { data } = await axios.put(`${baseURL}/api/v1/admin/user/${id}`,
            myForm,
            config)
        return data.success
    } catch (err) {

        return rejectWithValue(err.response.data.message)
    }

})


// thunk for deleting a user ADMIN

export const deleteUser = createAsyncThunk("deleteUser", async (id, { rejectWithValue }) => {

    try {

        const { data } = await axios.delete(`${baseURL}/api/v1/admin/user/${id}`,
            { withCredentials: true })
        return data
    } catch (err) {

        return rejectWithValue(err.response.data.message)
    }

})



export const adminUserSlice = createSlice({
    name: 'adminuser',
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.error = null
        },
        UPDATE_USER_RESET: (state) => {
            state.isUpdated = false
        },
        DELETE_USER_RESET: (state) => {
            state.isDeleted = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(getUserDetails.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getUserDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUserDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(updateUser.pending, (state, action) => {
                state.loading = true
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isUpdated = action.payload;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(deleteUser.pending, (state, action) => {
                state.loading = true
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isDeleted = action.payload.success;
                state.message = action.payload.message
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })



    }
})
export const { clearErrors, UPDATE_USER_RESET, DELETE_USER_RESET } = adminUserSlice.actions



export default adminUserSlice.reducer;