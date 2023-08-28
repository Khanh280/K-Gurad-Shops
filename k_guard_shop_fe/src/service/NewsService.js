import axios from "axios";
import * as ProductService from "../service/ProductService"

const token = localStorage.getItem("token")
export const getAllNews = async () => {
    const res = await axios.get("http://localhost:8080/api/news", {
        headers: {
            "Authorization": "Bearer " + await ProductService.getToken()
        }
    })
    return res;
}
export const getNewsById = async (id) => {
    const res = await axios.get("http://localhost:8080/api/news/" + (+id), {
        headers: {
            "Authorization": "Bearer " + await ProductService.getToken()
        }
    })
    return res;
}