import axios from "axios";
import * as ProductService from "../service/ProductService"
export const getCustomer = async ()=>{
    const res = await axios.get("http://localhost:8080/api/customer/detail", {
        headers: {
            "Authorization": "Bearer " + await ProductService.getToken()
        }
    })
    return res;
}
export const saveCustomer = async (customer) => {
    await axios.post("http://localhost:8080/api/customer", customer,{
        headers: {
            "Authorization": "Bearer " + await ProductService.getToken()
        }
    })
}