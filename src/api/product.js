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


export const newReview1 = async (myForm) => {
    const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
    };
    const { data } = await axios.put(`${baseURL}/api/v1/review`, myForm, config)
    return data.success

}

