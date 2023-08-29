import axios from "axios";
import * as ProductService from "../service/ProductService"
export const getAllNews = async () => {
    const res = await axios.get("http://localhost:8080/api/news")
    return res;
}
export const getNewsById = async (id) => {
    const res = await axios.get("http://localhost:8080/api/news/" + (+id))
    return res;
}