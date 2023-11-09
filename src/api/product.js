import axios from "axios";
import { baseURL } from "../baseAPI";

// API Call for getting products
export const getProducts = async ({ keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0 }) => {

    let link = `${baseURL}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

    if (category) {
        link = `${baseURL}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
    }
    const { data } = await axios.get(link)
    return data


}

// API call for getting productDetail
export const productData1 = async (id) => {

    const { data } = await axios.get(`${baseURL}/api/v1/product/${id}`)
    return data

}

// Adding a new review
export const newReview1 = async (myForm) => {
    const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
    };
    const { data } = await axios.put(`${baseURL}/api/v1/review`, myForm, config)
    return data.success

}

//  getting Admin products
export const getAdminProduct1 = async () => {
    const { data } = await axios.get(`${baseURL}/api/v1/admin/products`, { withCredentials: true })
    return data.products
}

// deleting product for Admin
export const deleteProduct1 = async (id) => {
    const { data } = await axios.delete(`${baseURL}/api/v1/admin/product/${id}`, { withCredentials: true })
    return data.success
}

// updating a product for Admin
export const updateProduct1 = async ({ id, myForm }) => {
    const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
    };

    const { data } = await axios.put(`${baseURL}/api/v1/admin/product/${id}`, myForm, config)
    return data.success

}

//  Adding new Product for Admin
export const createProduct1 = async (myForm) => {
    const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
    };

    const { data } = await axios.post(`${baseURL}/api/v1/admin/product/new`, myForm, config)
    return data
}

// getting reviews for  Admin
export const getAllReviews1 = async (id) => {
    const { data } = await axios.get(`${baseURL}/api/v1/reviews?id=${id}`, { withCredentials: true })
    return data.reviews
}

// deleting a Product review for Admin
export const deleteReviews1 = async ({ reviewId, productId }) => {
    const { data } = await axios.delete(`${baseURL}/api/v1/reviews?id=${reviewId}&productId=${productId}`, { withCredentials: true })
    return data.success
}