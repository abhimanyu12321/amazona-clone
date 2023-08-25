import { createSlice, createAsyncThunk, } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseURL } from '../../baseAPI';

const initialState = {
    user: {},
    loading: false,
    error: null,
    isAuthenticated: false,
}

//login user
export const login = createAsyncThunk("login", async ({ loginEmail, loginPassword }, { rejectWithValue }) => {

    try {
        const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };

        const { data } = await axios.post(`${baseURL}/api/v1/loginuser`,
            { email: loginEmail, password: loginPassword },
            config)
        return data
    } catch (err) {
        return rejectWithValue(err.response.data.message)
    }

})

// load user
export const loadUser = createAsyncThunk("loadUser", async (arg, { rejectWithValue }) => {

    try {
        const { data } = await axios.get(`${baseURL}/api/v1/me`, { withCredentials: true })
        return data
    } catch (err) {
        return rejectWithValue(err.response.data.message)
    }

})

//logout user
export const logout = createAsyncThunk("logout", async (arg, { rejectWithValue }) => {

    try {
        const { data } = await axios.get(`${baseURL}/api/v1/logout`, { withCredentials: true })
        return data
    } catch (err) {
        return rejectWithValue(err.response.data.message)
    }

})

// Register user
export const register = createAsyncThunk("register", async (myForm, { rejectWithValue }) => {

    try {
        const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };

        const { data } = await axios.post(`${baseURL}/api/v1/register`,
            myForm,
            config)
        return data
    } catch (err) {

        return rejectWithValue(err.response.data.message)
    }

})




export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state, action) => {
                state.loading = true
                state.isAuthenticated = false
                state.error = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
                state.isAuthenticated = false;
                state.user = {}
            })
            .addCase(register.pending, (state, action) => {
                state.loading = true
                state.isAuthenticated = false
                state.error = null
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
                state.isAuthenticated = false;
                state.user = {}
            })
            .addCase(loadUser.pending, (state, action) => {
                state.loading = true
                state.isAuthenticated = false
                state.error = null
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true
            })
            .addCase(loadUser.rejected, (state, action) => {
                state.loading = false;
                // state.error = action.payload
                state.isAuthenticated = false;
                state.user = {}
            })
            .addCase(logout.pending, (state, action) => {
                state.loading = true
                state.error = null
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.loading = false;
                state.user = {};
                state.isAuthenticated = false
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })



    }
})
//export const {  } = userSlice.actions



export default userSlice.reducer;