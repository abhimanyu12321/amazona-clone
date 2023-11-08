import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    user: {},
    isAuthenticated: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthentication: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user
        },
        logoutAction: (state, action) => {
            state.user = {};
            state.isAuthenticated = false
        }
    },
})
export const { setAuthentication, logoutAction } = userSlice.actions
export default userSlice.reducer;