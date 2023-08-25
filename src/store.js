import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slice/product/productSlice'
import userReducer from './slice/user/userSlice'
import updateUserReducer from './slice/user/updateUserSlice'
import cartReducer from './slice/cart/cartSlice'
import orderReducer from './slice/order/orderSlice'
import AdminProductReducer from './slice/product/AdminProductSlice'
import adminOrderReducer from './slice/order/adminOrderSlice'
import adminUserReducer from './slice/user/adminUserSlice'


export const store = configureStore({
    reducer: {
        products: productReducer,
        User: userReducer,
        profile: updateUserReducer,
        cart: cartReducer,
        newOrder: orderReducer,
        Admin: AdminProductReducer,
        adminOrder: adminOrderReducer,
        adminUser: adminUserReducer,
    },
})

