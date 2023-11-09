import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slice/user/userSlice'
import cartReducer from './slice/cart/cartSlice'


export const store = configureStore({
    reducer: {
        User: userReducer,
        cart: cartReducer,
    },
})

