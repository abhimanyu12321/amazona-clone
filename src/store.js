import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slice/product/productSlice'
import userReducer from './slice/user/userSlice'
import cartReducer from './slice/cart/cartSlice'
import orderReducer from './slice/order/orderSlice'
import AdminProductReducer from './slice/product/AdminProductSlice'
import adminOrderReducer from './slice/order/adminOrderSlice'


export const store = configureStore({
    reducer: {
        products: productReducer,
        User: userReducer,
        cart: cartReducer,
        newOrder: orderReducer,
        Admin: AdminProductReducer,
        adminOrder: adminOrderReducer,
    },
})

