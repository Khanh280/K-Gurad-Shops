import axios from "axios";
import * as ProductService from "../service/ProductService"

export const saveOrders = async (payment) => {
    const res = await axios.post("http://localhost:8080/api/orders", (`${payment}` || ""), {
        headers: {
            "Content-Type": "text/plain",
            "Authorization": "Bearer " + await ProductService.getToken()
        }
    })
    return res;
}
export const getAllOrderCustomer = async (page) => {
    const res = await axios.get("http://localhost:8080/api/orders/order-customer?page=" + page, {
        headers: {
            "Authorization": "Bearer " + await ProductService.getToken()
        }
    })
    return res;
}
export const getAllOrderDetailCustomer = async (page, orderId) => {
    const res = await axios.get("http://localhost:8080/api/orders/order-detail-customer?page=" + page + "&orderId=" + orderId, {
        headers: {
            "Authorization": "Bearer " + await ProductService.getToken()
        }
    })
    return res;
}