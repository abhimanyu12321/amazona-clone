import axios from "axios"
import { baseURL } from "../baseAPI"



//  getting my orders
export const myOrders1 = async () => {
    const { data } = await axios.get(`${baseURL}/api/v1/orders/me`, { withCredentials: true })
    return data.orders

}

//  getting orders detail for user
export const getOrderDetails1 = async (id) => {
    const { data } = await axios.get(`${baseURL}/api/v1/order/${id}`, { withCredentials: true })
    return data.order
}

//  creating order for user
export const createOrder1 = async (order) => {
    const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };

    const { data } = await axios.post(`${baseURL}/api/v1/order/new`,
        order,
        config)
    return data

}

//  getting All orders for Admin
export const getAllOrders1 = async () => {
    const { data } = await axios.get(`${baseURL}/api/v1/admin/orders`, { withCredentials: true })
    return data.orders

}


//  deleting order for Admin
export const deleteOrder1 = async (id) => {
    const { data } = await axios.delete(`${baseURL}/api/v1/admin/order/${id}`, { withCredentials: true })
    return data.success
}

//  updating order for Admin
export const updateOrder1 = async ({ id, myForm }) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true
    };
    const { data } = await axios.put(`${baseURL}/api/v1/admin/order/${id}`, myForm, config)
    return data.success

}

// Add item to cart
export const addItemsToCart1 = async ({ id, quantity }) => {

    const { data } = await axios.get(`${baseURL}/api/v1/product/${id}`)
    return {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.Stock,
        quantity,
    }

}
