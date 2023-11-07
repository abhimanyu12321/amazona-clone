import axios from "axios";
import { baseURL } from "../baseAPI";

export const getProducts1 = async ({ keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0 }) => {

    let link = `${baseURL}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

    if (category) {
        link = `${baseURL}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
    }
    const { data } = await axios.get(link)
    return data


}